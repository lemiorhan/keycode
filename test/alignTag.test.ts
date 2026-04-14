import test from 'node:test';
import assert from 'node:assert/strict';
import {extractSlideAlign} from '../src/alignTag.js';

test('extractSlideAlign returns align from <align> tag', () => {
  const result = extractSlideAlign('<align>left</align>\nSome content');
  assert.equal(result.align, 'left');
  assert.ok(!result.body.includes('<align>'));
});

test('extractSlideAlign returns undefined when no align tag', () => {
  const result = extractSlideAlign('Some content without alignment');
  assert.equal(result.align, undefined);
  assert.equal(result.body, 'Some content without alignment');
});

test('extractSlideAlign infers align from <p> tag when no <align> tag', () => {
  const content = '<p max-width=72 align=left>\nSome paragraph\n</p>';
  const result = extractSlideAlign(content);
  assert.equal(result.align, 'left');
  assert.equal(result.body, content);
});

test('extractSlideAlign infers right align from <p> tag', () => {
  const content = '<p align=right>\nText\n</p>';
  const result = extractSlideAlign(content);
  assert.equal(result.align, 'right');
});

test('extractSlideAlign prefers <align> tag over <p> tag', () => {
  const content = '<align>center</align>\n<p align=left>\nText\n</p>';
  const result = extractSlideAlign(content);
  assert.equal(result.align, 'center');
});

test('extractSlideAlign handles quoted align attribute in <p> tag', () => {
  const content = '<p align="left">\nText\n</p>';
  const result = extractSlideAlign(content);
  assert.equal(result.align, 'left');
});
