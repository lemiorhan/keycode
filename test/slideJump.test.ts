import test from 'node:test';
import assert from 'node:assert/strict';
import {parseSlideJumpTarget} from '../src/slideJump.js';

test('parseSlideJumpTarget resolves valid 1-based slide numbers to zero-based indexes', () => {
  assert.equal(parseSlideJumpTarget('1', 10), 0);
  assert.equal(parseSlideJumpTarget('07', 10), 6);
  assert.equal(parseSlideJumpTarget('10', 10), 9);
});

test('parseSlideJumpTarget rejects invalid slide numbers', () => {
  assert.equal(parseSlideJumpTarget('', 10), undefined);
  assert.equal(parseSlideJumpTarget('0', 10), undefined);
  assert.equal(parseSlideJumpTarget('11', 10), undefined);
  assert.equal(parseSlideJumpTarget('abc', 10), undefined);
  assert.equal(parseSlideJumpTarget('3x', 10), undefined);
});
