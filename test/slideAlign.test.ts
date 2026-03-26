import test from 'node:test';
import assert from 'node:assert/strict';
import {slideDefaultAlign} from '../src/slideAlign.js';
import type {Slide} from '../src/types.js';

test('slideDefaultAlign prefers explicit alignment', () => {
  const slide: Slide = {
    index: 0,
    raw: '',
    body: '',
    isAsciiArt: false,
    hasQuestion: false,
    qrText: 'https://example.com',
    align: 'center',
    size: 'normal'
  };

  assert.equal(slideDefaultAlign(slide), 'center');
});

test('slideDefaultAlign falls back to left for qr slides', () => {
  const slide: Slide = {
    index: 0,
    raw: '',
    body: '',
    isAsciiArt: false,
    hasQuestion: false,
    qrText: 'https://example.com',
    size: 'normal'
  };

  assert.equal(slideDefaultAlign(slide), 'left');
});

test('slideDefaultAlign falls back to center for normal slides', () => {
  const slide: Slide = {
    index: 0,
    raw: '',
    body: '',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  assert.equal(slideDefaultAlign(slide), 'center');
});
