#!/usr/bin/env node
import {existsSync, watch, type FSWatcher} from 'node:fs';
import {readFile} from 'node:fs/promises';
import {resolve, basename} from 'node:path';
import React, {useEffect, useRef, useState} from 'react';
import {Box, Text, render, useApp, useInput, useStdout} from 'ink';
import {parseSlides} from './parser.js';
import {readDeckDirectory} from './file.js';
import {PreviewViewer} from './previewWindow.js';
import {mapCursorToSlideIndex, parseCursorFile} from './slideMapping.js';
import type {Slide} from './types.js';

const CURSOR_FILE = '.preview-cursor';

interface PreviewRootProps {
  deckDirectory: string;
  initialSlides: Slide[];
  initialSldFiles: string[];
}

function PreviewRoot({
  deckDirectory,
  initialSlides,
  initialSldFiles
}: PreviewRootProps): React.JSX.Element {
  const {exit} = useApp();
  const {stdout} = useStdout();
  const [slides, setSlides] = useState(initialSlides);
  const [sldFiles, setSldFiles] = useState(initialSldFiles);
  const [slideIndex, setSlideIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);
  const viewerRef = useRef(new PreviewViewer());
  const fileContentsRef = useRef<Map<string, string>>(new Map());
  const rows = stdout.rows ?? process.stdout.rows ?? 24;
  const columns = stdout.columns ?? process.stdout.columns ?? 80;

  // Load initial file contents for cursor mapping
  useEffect(() => {
    const loadContents = async (): Promise<void> => {
      const contents = new Map<string, string>();

      for (const f of sldFiles) {
        try {
          const content = await readFile(f, 'utf8');
          contents.set(f, content);
        } catch {
          // ignore read errors
        }
      }

      fileContentsRef.current = contents;
    };

    void loadContents();
  }, [sldFiles]);

  // File watcher effect — watches .sld files, images/, .index
  useEffect(() => {
    const sldWatchers: FSWatcher[] = [];
    let imagesWatcher: FSWatcher | undefined;
    let indexWatcher: FSWatcher | undefined;
    let disposed = false;
    let reloadTimer: NodeJS.Timeout | undefined;

    const imagesDirectory = resolve(deckDirectory, 'images');
    const indexPath = resolve(deckDirectory, '.index');

    const clearTimer = (): void => {
      if (reloadTimer) {
        clearTimeout(reloadTimer);
        reloadTimer = undefined;
      }
    };

    const reloadDeck = async (): Promise<void> => {
      try {
        const {source, sldFiles: newSldFiles} = await readDeckDirectory(deckDirectory);
        const deck = parseSlides(source);

        if (disposed || deck.slides.length === 0) {
          return;
        }

        setSlides(deck.slides);
        setSldFiles(newSldFiles);
        setStatusMessage(undefined);

        // Refresh file contents for cursor mapping
        const contents = new Map<string, string>();

        for (const f of newSldFiles) {
          try {
            const content = await readFile(f, 'utf8');
            contents.set(f, content);
          } catch {
            // ignore
          }
        }

        if (!disposed) {
          fileContentsRef.current = contents;
        }
      } catch (error) {
        if (!disposed) {
          const message = error instanceof Error ? error.message : String(error);
          setStatusMessage(`Reload failed: ${message}`);
        }
      }
    };

    const scheduleReload = (): void => {
      clearTimer();
      reloadTimer = setTimeout(() => {
        void reloadDeck();
      }, 120);
    };

    const deckDirWatcher = watch(deckDirectory, () => {
      scheduleReload();
    });

    for (const sldFile of sldFiles) {
      sldWatchers.push(watch(sldFile, () => {
        scheduleReload();
      }));
    }

    if (existsSync(imagesDirectory)) {
      imagesWatcher = watch(imagesDirectory, () => {
        scheduleReload();
      });
    }

    if (existsSync(indexPath)) {
      indexWatcher = watch(indexPath, () => {
        scheduleReload();
      });
    }

    return () => {
      disposed = true;
      clearTimer();
      deckDirWatcher.close();
      for (const w of sldWatchers) {
        w.close();
      }
      imagesWatcher?.close();
      indexWatcher?.close();
    };
  }, [deckDirectory, sldFiles]);

  // Cursor file watcher effect
  useEffect(() => {
    const cursorPath = resolve(deckDirectory, CURSOR_FILE);
    let disposed = false;
    let cursorTimer: NodeJS.Timeout | undefined;
    let cursorWatcher: FSWatcher | undefined;

    const clearTimer = (): void => {
      if (cursorTimer) {
        clearTimeout(cursorTimer);
        cursorTimer = undefined;
      }
    };

    const readCursor = async (): Promise<void> => {
      try {
        const content = await readFile(cursorPath, 'utf8');
        const cursorInfo = parseCursorFile(content);

        if (disposed || !cursorInfo) {
          return;
        }

        const newIndex = mapCursorToSlideIndex(
          cursorInfo,
          sldFiles,
          fileContentsRef.current,
          slides.length
        );

        setSlideIndex(newIndex);
      } catch {
        // .preview-cursor doesn't exist or can't be read — keep current index
      }
    };

    const scheduleCursorRead = (): void => {
      clearTimer();
      cursorTimer = setTimeout(() => {
        void readCursor();
      }, 50);
    };

    // Read cursor file on mount if it exists
    if (existsSync(cursorPath)) {
      void readCursor();

      cursorWatcher = watch(cursorPath, () => {
        scheduleCursorRead();
      });
    } else {
      // Watch the deck directory for the cursor file to appear
      cursorWatcher = watch(deckDirectory, (eventType, filename) => {
        if (filename === CURSOR_FILE) {
          scheduleCursorRead();
        }
      });
    }

    return () => {
      disposed = true;
      clearTimer();
      cursorWatcher?.close();
    };
  }, [deckDirectory, sldFiles, slides.length]);

  // Clamp slide index when slides change
  useEffect(() => {
    if (slides.length === 0) {
      return;
    }

    setSlideIndex((current) => Math.min(current, slides.length - 1));
  }, [slides]);

  // Preview window management
  useEffect(() => {
    const viewer = viewerRef.current;
    viewer.open();

    const timer = setTimeout(() => {
      viewer.update({slides, slideIndex, rows, columns, deckDirectory});
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Update preview when slide changes
  useEffect(() => {
    const viewer = viewerRef.current;
    viewer.update({slides, slideIndex, rows, columns, deckDirectory});
  }, [slideIndex, slides, rows, columns]);

  // Cleanup on unmount
  useEffect(() => {
    const viewer = viewerRef.current;

    return () => {
      viewer.close();
    };
  }, []);

  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      exit();
      return;
    }

    if (input === 'q') {
      exit();
    }
  });

  const deckName = basename(deckDirectory);

  return (
    <Box flexDirection="column">
      <Text>Preview: {deckName}</Text>
      <Text dimColor>Slide {slideIndex + 1}/{slides.length}</Text>
      {statusMessage && <Text color="yellow">{statusMessage}</Text>}
      <Text dimColor>Watching for changes... Press q to quit.</Text>
    </Box>
  );
}

async function main(): Promise<void> {
  const deckDirInput = process.argv[2];

  if (!deckDirInput) {
    console.error('Usage: keycode preview <deck-name>');
    process.exitCode = 1;
    return;
  }

  const deckDirectory = resolve(deckDirInput);
  const {source, sldFiles} = await readDeckDirectory(deckDirectory);
  const deck = parseSlides(source);

  if (deck.slides.length === 0) {
    console.error('No slides found in the deck directory.');
    process.exitCode = 1;
    return;
  }

  render(
    <PreviewRoot
      deckDirectory={deckDirectory}
      initialSlides={deck.slides}
      initialSldFiles={sldFiles}
    />,
    {
      exitOnCtrlC: false
    }
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to start preview: ${message}`);
  process.exitCode = 1;
});
