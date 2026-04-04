#!/usr/bin/env node
import {existsSync, watch, type FSWatcher} from 'node:fs';
import {resolve} from 'node:path';
import React, {useEffect, useState} from 'react';
import {render} from 'ink';
import {parseSlides} from './parser.js';
import {readDeckDirectory} from './file.js';
import {PresentationApp} from './PresentationApp.js';
import type {Slide} from './types.js';

interface PresentationRootProps {
  deckDirectory: string;
  initialSlides: Slide[];
  initialSldFiles: string[];
}

function PresentationRoot({
  deckDirectory,
  initialSlides,
  initialSldFiles
}: PresentationRootProps): React.JSX.Element {
  const [slides, setSlides] = useState(initialSlides);
  const [mediaVersion, setMediaVersion] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sldWatchers: FSWatcher[] = [];
    let imagesWatcher: FSWatcher | undefined;
    let disposed = false;
    let reloadTimer: NodeJS.Timeout | undefined;

    const imagesDirectory = resolve(deckDirectory, 'images');

    const clearTimer = (): void => {
      if (reloadTimer) {
        clearTimeout(reloadTimer);
        reloadTimer = undefined;
      }
    };

    const reloadDeck = async (): Promise<void> => {
      try {
        const {source} = await readDeckDirectory(deckDirectory);
        const deck = parseSlides(source);

        if (disposed || deck.slides.length === 0) {
          return;
        }

        setSlides(deck.slides);
        setMediaVersion((current) => current + 1);
        setStatusMessage(undefined);
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

    for (const sldFile of initialSldFiles) {
      sldWatchers.push(watch(sldFile, () => {
        scheduleReload();
      }));
    }

    if (existsSync(imagesDirectory)) {
      imagesWatcher = watch(imagesDirectory, () => {
        scheduleReload();
      });
    }

    return () => {
      disposed = true;
      clearTimer();
      for (const w of sldWatchers) {
        w.close();
      }
      imagesWatcher?.close();
    };
  }, [deckDirectory, initialSldFiles]);

  return (
    <PresentationApp
      slides={slides}
      deckDirectory={deckDirectory}
      mediaVersion={mediaVersion}
      statusMessage={statusMessage}
    />
  );
}

async function main(): Promise<void> {
  const deckDirInput = process.argv[2];

  if (!deckDirInput) {
    console.error('Usage: keycode present <deck-name>');
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
    <PresentationRoot
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
  console.error(`Failed to start presentation: ${message}`);
  process.exitCode = 1;
});
