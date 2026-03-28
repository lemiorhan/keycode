#!/usr/bin/env node
import {existsSync, watch, type FSWatcher} from 'node:fs';
import {dirname, resolve} from 'node:path';
import React, {useEffect, useState} from 'react';
import {render} from 'ink';
import {parseSlides} from './parser.js';
import {readSlidesFile} from './file.js';
import {PresentationApp} from './PresentationApp.js';
import type {Slide} from './types.js';

interface PresentationRootProps {
  slidesPath: string;
  deckDirectory: string;
  initialSlides: Slide[];
}

function PresentationRoot({
  slidesPath,
  deckDirectory,
  initialSlides
}: PresentationRootProps): React.JSX.Element {
  const [slides, setSlides] = useState(initialSlides);
  const [mediaVersion, setMediaVersion] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    let slidesWatcher: FSWatcher | undefined;
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
        const source = await readSlidesFile(slidesPath);
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

    slidesWatcher = watch(slidesPath, () => {
      scheduleReload();
    });

    if (existsSync(imagesDirectory)) {
      imagesWatcher = watch(imagesDirectory, () => {
        scheduleReload();
      });
    }

    return () => {
      disposed = true;
      clearTimer();
      slidesWatcher?.close();
      imagesWatcher?.close();
    };
  }, [deckDirectory, slidesPath]);

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
  const slidesPathInput = process.argv[2];

  if (!slidesPathInput) {
    console.error('Usage: present <slides-file>');
    process.exitCode = 1;
    return;
  }

  const slidesPath = resolve(slidesPathInput);
  const deckDirectory = dirname(slidesPath);
  const source = await readSlidesFile(slidesPath);
  const deck = parseSlides(source);

  if (deck.slides.length === 0) {
    console.error('No slides found in the provided file.');
    process.exitCode = 1;
    return;
  }

  render(
    <PresentationRoot
      slidesPath={slidesPath}
      deckDirectory={deckDirectory}
      initialSlides={deck.slides}
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
