import test from 'node:test';
import assert from 'node:assert/strict';
import {applyRevealLines, countRevealLines} from '../src/revealLines.js';

test('countRevealLines counts lines that start with =>', () => {
  const content = 'Always visible\n=> First\n=> Second\nDone';

  assert.equal(countRevealLines(content), 2);
});

test('applyRevealLines hides reveal lines until they are stepped in', () => {
  const content = 'Always visible\n=> First\n=> Second\nDone';

  assert.equal(applyRevealLines(content, 0), 'Always visible\nDone');
  assert.equal(
    applyRevealLines(content, 1),
    '\x1b[90mAlways visible\x1b[39m\nFirst\n\x1b[90mDone\x1b[39m'
  );
  assert.equal(
    applyRevealLines(content, 2),
    '\x1b[90mAlways visible\x1b[39m\n\x1b[90mFirst\x1b[39m\nSecond\n\x1b[90mDone\x1b[39m'
  );
});
