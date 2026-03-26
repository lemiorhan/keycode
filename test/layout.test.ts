import test from 'node:test';
import assert from 'node:assert/strict';
import {centerTextBlock, composeBottomRightOverlayLayout} from '../src/layout.js';

test('centerTextBlock centers a short block with a hint line', () => {
  const output = centerTextBlock('Hello', {
    rows: 7,
    columns: 11,
    hintLine: 'hint'
  });

  assert.equal(output, '\n\n   Hello\n\n\n\nhint');
});

test('centerTextBlock crops long lines to viewport width', () => {
  const output = centerTextBlock('abcdefghijklmnop', {
    rows: 3,
    columns: 5
  });

  assert.match(output, /abcde/);
});

test('composeBottomRightOverlayLayout anchors overlay bottom-right and keeps text on the left', () => {
  const output = composeBottomRightOverlayLayout('Hello', 'XX\nXX', {
    rows: 6,
    columns: 14
  });
  const lines = output.split('\n');

  assert.equal(lines[2]?.includes('Hello'), true);
  assert.equal(lines[3]?.endsWith('  XX'), true);
  assert.equal(lines[4]?.endsWith('  XX'), true);
});
