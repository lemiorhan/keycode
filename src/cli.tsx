#!/usr/bin/env node
import {dirname, resolve} from 'node:path';
import React from 'react';
import {render} from 'ink';
import {parseSlides} from './parser.js';
import {readSlidesFile} from './file.js';
import {PresentationApp} from './PresentationApp.js';

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

  render(<PresentationApp slides={deck.slides} deckDirectory={deckDirectory} />, {
    exitOnCtrlC: false
  });
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to start presentation: ${message}`);
  process.exitCode = 1;
});
