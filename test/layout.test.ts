import test from 'node:test';
import assert from 'node:assert/strict';
import {centerTextBlock} from '../src/layout.js';

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
