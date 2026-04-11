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
  assert.equal(result, 'First line of notes. Second line of notes.');
});

test('extractPresenterNotes trims leading and trailing blank lines', () => {
  const raw = `/* PRESENTER NOTES:

Leading blank line above.
Trailing blank line below.

*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'Leading blank line above. Trailing blank line below.');
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
  assert.equal(result, 'Line with trailing spaces. Another line.');
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

test('extractPresenterNotes collapses single newlines but preserves double newlines', () => {
  const raw = `/* PRESENTER NOTES:
First paragraph line one.
First paragraph line two.

Second paragraph line one.
Second paragraph line two.
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'First paragraph line one. First paragraph line two.\n\nSecond paragraph line one. Second paragraph line two.');
});

test('extractPresenterNotes preserves triple newlines as double newline', () => {
  const raw = `/* PRESENTER NOTES:
Paragraph one.


Paragraph two.
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'Paragraph one.\n\nParagraph two.');
});

test('extractPresenterNotes converts * lines to bullet points', () => {
  const raw = `/* PRESENTER NOTES:
* First bullet
* Second bullet
* Third bullet
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, '• First bullet\n• Second bullet\n• Third bullet');
});

test('extractPresenterNotes mixes paragraphs and bullet points', () => {
  const raw = `/* PRESENTER NOTES:
This is an intro paragraph
that wraps to a second line.

* Bullet one
* Bullet two

Closing paragraph.
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, 'This is an intro paragraph that wraps to a second line.\n\n• Bullet one\n• Bullet two\n\nClosing paragraph.');
});

test('extractPresenterNotes collapses continuation line into bullet', () => {
  const raw = `/* PRESENTER NOTES:
* A long bullet point
that continues on the next line.
* Short bullet
*/`;

  const result = extractPresenterNotes(raw);
  assert.equal(result, '• A long bullet point that continues on the next line.\n• Short bullet');
});

test('parseSlides preserves non-presenter block comments behavior', () => {
  const source = `Content here

/* Regular comment that gets stripped */

More content`;

  const deck = parseSlides(source);
  assert.equal(deck.slides[0].body.includes('Regular comment'), false);
  assert.equal(deck.slides[0].presenterNotes, undefined);
});
