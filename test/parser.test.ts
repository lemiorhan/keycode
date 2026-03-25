import test from 'node:test';
import assert from 'node:assert/strict';
import {parseSlides} from '../src/parser.js';

test('parseSlides splits on separators and preserves multiline content', () => {
  const deck = parseSlides(`
Title
Line two
---
Body line 1
Body line 2
`);

  assert.equal(deck.slides.length, 2);
  assert.equal(deck.slides[0]?.body, 'Title\nLine two');
  assert.equal(deck.slides[1]?.body, 'Body line 1\nBody line 2');
});

test('parseSlides preserves leading spaces for ascii art slides', () => {
  const deck = parseSlides(`
  /\\_/\\\\
 ( o.o )
  > ^ <
---
content
---
  ____ 
 / __ \\
/_/  \\_\\
`);

  assert.equal(deck.slides[0]?.body, '  /\\_/\\\\\n ( o.o )\n  > ^ <');
  assert.equal(deck.slides[0]?.isAsciiArt, true);
  assert.equal(deck.slides[2]?.isAsciiArt, true);
});

test('parseSlides detects question slides and strips control token from rendered body', () => {
  const deck = parseSlides(`
Ask the room:
[QUESTION]
What do you think?
`);

  assert.equal(deck.slides[0]?.hasQuestion, true);
  assert.equal(deck.slides[0]?.body, 'Ask the room:\nWhat do you think?');
});

test('parseSlides extracts image source from image-url blocks', () => {
  const deck = parseSlides(`
<image-url>
lemi.png
</image-url>
About the speaker
`);

  assert.equal(deck.slides[0]?.imageSource, 'lemi.png');
  assert.equal(deck.slides[0]?.body, 'About the speaker');
});

test('parseSlides extracts <title> block text and keeps the rest of slide content plain', () => {
  const deck = parseSlides(`
<title>
The Rebirth of Software Craftsmanship in the AI Era
</title>
Lemi Orhan Ergin
Co-Founder at Craftgate
`);

  assert.equal(deck.slides[0]?.titleText, 'The Rebirth of Software Craftsmanship in the AI Era');
  assert.equal(deck.slides[0]?.body, 'Lemi Orhan Ergin\nCo-Founder at Craftgate');
});

test('parseSlides supports multi-line <title> blocks', () => {
  const deck = parseSlides(`
<title>
The Rebirth of Software Craftsmanship
in the AI Era
</title>
Speaker
`);

  assert.equal(
    deck.slides[0]?.titleText,
    'The Rebirth of Software Craftsmanship\nin the AI Era'
  );
  assert.equal(deck.slides[0]?.body, 'Speaker');
});
