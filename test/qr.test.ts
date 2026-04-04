import test from 'node:test';
import assert from 'node:assert/strict';
import {renderTerminalQr} from '../src/qr.js';
import {shouldSkipTransition} from '../src/transitionPolicy.js';
import type {Slide} from '../src/types.js';

test('renderTerminalQr creates a consistent block qr with padded rows', () => {
  const rendered = renderTerminalQr('https://craftgate.io/talk', {
    maxColumns: 80,
    maxRows: 40
  });

  const lines = rendered.output.split('\n');

  assert.equal(lines.length, rendered.height);
  assert.equal(lines.every((line) => line.length === rendered.width), true);
  assert.equal(lines.some((line) => /[█▀▄]/.test(line)), true);
});

test('renderTerminalQr falls back safely when viewport is too small', () => {
  const rendered = renderTerminalQr('https://craftgate.io/talk', {
    maxColumns: 4,
    maxRows: 1
  });

  assert.equal(rendered.output, '[QR too large]');
});

test('renderTerminalQr can use a compact quiet-zone-free variant in tighter spaces', () => {
  const rendered = renderTerminalQr('https://craftgate.io/talk', {
    maxColumns: 25,
    maxRows: 20
  });

  assert.notEqual(rendered.output, '[QR too large]');
});

test('shouldSkipTransition keeps transitions enabled for qr slides', () => {
  const slide: Slide = {
    index: 0,
    raw: '<qr>https://craftgate.io</qr>',
    body: '',
    isAsciiArt: false,
    hasQuestion: false,
    qrText: 'https://craftgate.io',
    align: 'center',
    size: 'normal'
  };

  assert.equal(shouldSkipTransition(slide, 'body'), false);
});

test('shouldSkipTransition skips transitions for ai simulation slides', () => {
  const slide: Slide = {
    index: 0,
    raw: '[QUESTION]\n<ai-sim><ai-step>Working</ai-step></ai-sim>',
    body: '',
    isAsciiArt: false,
    hasQuestion: true,
    aiSimulation: {
      intervalMinMs: 3000,
      intervalMaxMs: 5000,
      steps: [{content: 'Working'}]
    },
    size: 'normal'
  };

  assert.equal(shouldSkipTransition(slide, 'body'), true);
});
