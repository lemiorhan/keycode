import test from 'node:test';
import assert from 'node:assert/strict';
import {extractPresenterNotes} from '../src/presenterNotesTag.js';
import {parseSlides} from '../src/parser.js';

test('extractPresenterNotes returns undefined when no presenter notes block', () => {
  const result = extractPresenterNotes('Just some slide content');
  assert.equal(result, undefined);
});

test('extractPresenterNotes returns undefined for regular block comments', () => {
  const result = extractPresenterNotes('/* This is a regular comment */');
  assert.equal(result, undefined);
});

test('extractPresenterNotes extracts notes from PRESENTER NOTES block', () => {
  const raw = `Some content

/* PRESENTER NOTES:
First line of notes.
Second line of notes.
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'First line of notes.\nSecond line of notes.');
});

test('extractPresenterNotes trims leading and trailing blank lines', () => {
  const raw = `/* PRESENTER NOTES:

Leading blank line above.
Trailing blank line below.

*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'Leading blank line above.\nTrailing blank line below.');
});

test('extractPresenterNotes preserves color tags in notes', () => {
  const raw = `/* PRESENTER NOTES:
This has <color fg="yellow">colored</color> text.
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'This has <color fg="yellow">colored</color> text.');
});

test('extractPresenterNotes is case-insensitive', () => {
  const raw = `/* presenter notes:
Some notes here.
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'Some notes here.');
});

test('extractPresenterNotes trims trailing whitespace per line', () => {
  const raw = `/* PRESENTER NOTES:
Line with trailing spaces.   
Another line.
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'Line with trailing spaces.\nAnother line.');
});

test('parseSlides extracts presenterNotes per slide', () => {
  const source = `Slide one content

/* PRESENTER NOTES:
Notes for slide one.
*/

---

Slide two content

/* PRESENTER NOTES:
Notes for slide two.
*/

---

Slide three no notes`;

  const deck = parseSlides(source);
  assert.equal(deck.slides.length, 3);
  assert.equal(deck.slides[0].presenterNotes, 'Notes for slide one.');
  assert.equal(deck.slides[1].presenterNotes, 'Notes for slide two.');
  assert.equal(deck.slides[2].presenterNotes, undefined);
});

test('parseSlides strips presenter notes block from slide body', () => {
  const source = `Content here

/* PRESENTER NOTES:
Secret notes.
*/`;

  const deck = parseSlides(source);
  assert.equal(deck.slides[0].body.includes('Secret notes'), false);
  assert.equal(deck.slides[0].body.includes('PRESENTER NOTES'), false);
});

test('parseSlides preserves non-presenter block comments behavior', () => {
  const source = `Content here

/* Regular comment that gets stripped */

More content`;

  const deck = parseSlides(source);
  assert.equal(deck.slides[0].body.includes('Regular comment'), false);
  assert.equal(deck.slides[0].presenterNotes, undefined);
});
