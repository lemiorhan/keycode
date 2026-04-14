import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCursorFile, countSlidesInContent, mapCursorToSlideIndex} from '../src/slideMapping.js';

// ── parseCursorFile ──

test('parseCursorFile parses valid format', () => {
  const result = parseCursorFile('01-intro.sld:42');
  assert.deepStrictEqual(result, {filename: '01-intro.sld', line: 42});
});

test('parseCursorFile returns undefined for empty string', () => {
  assert.equal(parseCursorFile(''), undefined);
});

test('parseCursorFile returns undefined when no colon', () => {
  assert.equal(parseCursorFile('01-intro.sld'), undefined);
});

test('parseCursorFile returns undefined for non-numeric line', () => {
  assert.equal(parseCursorFile('01-intro.sld:abc'), undefined);
});

test('parseCursorFile returns undefined for line number 0', () => {
  assert.equal(parseCursorFile('01-intro.sld:0'), undefined);
});

test('parseCursorFile returns undefined for negative line number', () => {
  assert.equal(parseCursorFile('01-intro.sld:-5'), undefined);
});

test('parseCursorFile returns undefined for non-.sld filename', () => {
  assert.equal(parseCursorFile('readme.txt:10'), undefined);
});

test('parseCursorFile trims whitespace', () => {
  const result = parseCursorFile('  slides.sld:7  \n');
  assert.deepStrictEqual(result, {filename: 'slides.sld', line: 7});
});

test('parseCursorFile handles line number 1', () => {
  const result = parseCursorFile('slides.sld:1');
  assert.deepStrictEqual(result, {filename: 'slides.sld', line: 1});
});

// ── countSlidesInContent ──

test('countSlidesInContent counts single slide', () => {
  assert.equal(countSlidesInContent('Slide one'), 1);
});

test('countSlidesInContent counts multiple slides', () => {
  assert.equal(countSlidesInContent('Slide one\n\n---\n\nSlide two\n\n---\n\nSlide three'), 3);
});

test('countSlidesInContent ignores empty parts', () => {
  assert.equal(countSlidesInContent('Slide one\n\n---\n\n---'), 1);
});

test('countSlidesInContent returns 0 for empty content', () => {
  assert.equal(countSlidesInContent(''), 0);
});

test('countSlidesInContent handles trailing separator', () => {
  assert.equal(countSlidesInContent('Slide one\n\n---\nSlide two\n\n---'), 2);
});

// ── mapCursorToSlideIndex ──

test('mapCursorToSlideIndex returns 0 for cursor in first slide of first file', () => {
  const sldFiles = ['/deck/01.sld', '/deck/02.sld'];
  const contents = new Map([
    ['/deck/01.sld', 'Slide A\n\n---\n\nSlide B'],
    ['/deck/02.sld', 'Slide C']
  ]);

  const result = mapCursorToSlideIndex(
    {filename: '01.sld', line: 1},
    sldFiles,
    contents,
    3
  );
  assert.equal(result, 0);
});

test('mapCursorToSlideIndex returns 1 for cursor past first separator', () => {
  const sldFiles = ['/deck/01.sld'];
  const contents = new Map([
    ['/deck/01.sld', 'Slide A\n\n---\n\nSlide B']
  ]);

  const result = mapCursorToSlideIndex(
    {filename: '01.sld', line: 5},
    sldFiles,
    contents,
    2
  );
  assert.equal(result, 1);
});

test('mapCursorToSlideIndex accounts for preceding files', () => {
  const sldFiles = ['/deck/01.sld', '/deck/02.sld'];
  const contents = new Map([
    ['/deck/01.sld', 'Slide A\n\n---\n\nSlide B'],
    ['/deck/02.sld', 'Slide C\n\n---\n\nSlide D\n\n---\n\nSlide E']
  ]);

  // Cursor in 02.sld past second separator -> local offset 2, preceding slides 2
  const result = mapCursorToSlideIndex(
    {filename: '02.sld', line: 7},
    sldFiles,
    contents,
    5
  );
  assert.equal(result, 4);
});

test('mapCursorToSlideIndex returns 0 for unknown filename', () => {
  const sldFiles = ['/deck/01.sld'];
  const contents = new Map([
    ['/deck/01.sld', 'Slide A']
  ]);

  const result = mapCursorToSlideIndex(
    {filename: 'unknown.sld', line: 5},
    sldFiles,
    contents,
    1
  );
  assert.equal(result, 0);
});

test('mapCursorToSlideIndex clamps to max slide index', () => {
  const sldFiles = ['/deck/01.sld'];
  const contents = new Map([
    ['/deck/01.sld', 'Slide A\n\n---\n\nSlide B']
  ]);

  const result = mapCursorToSlideIndex(
    {filename: '01.sld', line: 999},
    sldFiles,
    contents,
    2
  );
  assert.equal(result, 1);
});

test('mapCursorToSlideIndex handles cursor on separator line', () => {
  const sldFiles = ['/deck/01.sld'];
  const contents = new Map([
    ['/deck/01.sld', 'Slide A\n---\nSlide B']
  ]);

  // Line 2 is the --- separator itself
  const result = mapCursorToSlideIndex(
    {filename: '01.sld', line: 2},
    sldFiles,
    contents,
    2
  );
  assert.equal(result, 1);
});

test('mapCursorToSlideIndex handles single file deck', () => {
  const sldFiles = ['/deck/slides.sld'];
  const contents = new Map([
    ['/deck/slides.sld', 'One\n\n---\n\nTwo\n\n---\n\nThree']
  ]);

  const result = mapCursorToSlideIndex(
    {filename: 'slides.sld', line: 5},
    sldFiles,
    contents,
    3
  );
  assert.equal(result, 1);
});
