import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPresentationFrame,
  extractImageAnchor,
  resolveInlineImageOverlayAnchor
} from '../src/PresentationApp.js';
import {IMAGE_ANCHOR_TOKEN} from '../src/imageTag.js';
import type {Slide} from '../src/types.js';

function makeSlide(overrides: Partial<Slide> = {}): Slide {
  return {
    index: 0,
    raw: '',
    body: '',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal',
    ...overrides
  };
}

test('resolveInlineImageOverlayAnchor uses the stable rendered slide layout', () => {
  const slide = makeSlide({
    body: `${IMAGE_ANCHOR_TOKEN}\nBody`,
    imagePath: 'speaker.png'
  });
  const stableTextFrame = `${IMAGE_ANCHOR_TOKEN}\nBody`;
  const transitionTextFrame = 'SCRAMBLED\nBody';
  const spacerRows = 5;
  const stableAnchor = resolveInlineImageOverlayAnchor({
    slide,
    textFrame: stableTextFrame,
    spacerRows,
    rows: 24,
    columns: 80,
    align: 'center'
  });
  const transitionAnchor = extractImageAnchor(
    buildPresentationFrame({
      slide,
      textFrame: transitionTextFrame,
      rows: 24,
      columns: 80,
      align: 'center'
    })
  ).anchor;

  assert.ok(stableAnchor);
  assert.equal(transitionAnchor, undefined);
  assert.equal(stableAnchor.row > 0, true);
});
