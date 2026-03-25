import test from 'node:test';
import assert from 'node:assert/strict';
import {buildTransitionFrames} from '../src/transition.js';

test('buildTransitionFrames resolves to the target content', () => {
  const frames = buildTransitionFrames('Hello', 4, 1);

  assert.equal(frames.length, 4);
  assert.equal(frames.at(-1)?.output, 'Hello');
});

test('buildTransitionFrames preserves spaces and newlines while scrambling', () => {
  const frames = buildTransitionFrames('A B\nC', 3, 2);

  assert.equal(frames[0]?.output.includes(' '), true);
  assert.equal(frames[0]?.output.includes('\n'), true);
});
