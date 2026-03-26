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

  assert.equal(deck.slides[0]?.body, '/\\_/\\\\\n ( o.o )\n  > ^ <');
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

test('parseSlides strips image-url blocks from slide body', () => {
  const deck = parseSlides(`
<image-url>
lemi.png
</image-url>
About the speaker
`);

  assert.equal(deck.slides[0]?.body, 'About the speaker');
});

test('parseSlides extracts image tags and removes them from body content', () => {
  const deck = parseSlides(`
<image path="lemi.png" width=35% bg-color="#111111">
About the speaker
`);

  assert.equal(deck.slides[0]?.imagePath, 'lemi.png');
  assert.equal(deck.slides[0]?.imageWidthPercent, 35);
  assert.equal(deck.slides[0]?.imageBackgroundColor, '#111111');
  assert.equal(deck.slides[0]?.body, 'About the speaker');
});

test('parseSlides extracts screen tags and removes them from body content', () => {
  const deck = parseSlides(`
<screen content-align=right width=40%></screen>
<screen content-align=left width=60%></screen>
About the speaker
`);

  assert.equal(deck.slides[0]?.screens?.length, 2);
  assert.deepEqual(deck.slides[0]?.screens?.[0], {contentAlign: 'right', widthPercent: 40});
  assert.deepEqual(deck.slides[0]?.screens?.[1], {contentAlign: 'left', widthPercent: 60});
  assert.equal(deck.slides[0]?.body, 'About the speaker');
});

test('parseSlides extracts per-slide size directives', () => {
  const deck = parseSlides(`
<size>xlarge</size>
Big slide
`);

  assert.equal(deck.slides[0]?.size, 'xlarge');
  assert.equal(deck.slides[0]?.body, 'Big slide');
});

test('parseSlides extracts per-slide alignment directives', () => {
  const deck = parseSlides(`
<align>left</align>
Aligned slide
`);

  assert.equal(deck.slides[0]?.align, 'left');
  assert.equal(deck.slides[0]?.body, 'Aligned slide');
});

test('parseSlides leaves alignment undefined when no tag is provided', () => {
  const deck = parseSlides(`
Centered by default
`);

  assert.equal(deck.slides[0]?.align, undefined);
});

test('parseSlides extracts qr blocks and removes them from body content', () => {
  const deck = parseSlides(`
<qr width=45%>
https://craftgate.io/talk
</qr>
Scan this to follow along
`);

  assert.equal(deck.slides[0]?.qrText, 'https://craftgate.io/talk');
  assert.equal(deck.slides[0]?.qrWidthPercent, 45);
  assert.equal(deck.slides[0]?.body, 'Scan this to follow along');
});

test('parseSlides extracts footnote blocks and removes them from body content', () => {
  const deck = parseSlides(`
Main slide content

<footnote>
Source: Example report
Second line
</footnote>
`);

  assert.equal(deck.slides[0]?.body, 'Main slide content');
  assert.equal(deck.slides[0]?.footnote, 'Source: Example report\nSecond line');
});

test('parseSlides extracts ascii-art blocks and removes them from body content', () => {
  const deck = parseSlides(`
<ascii-art>
 /\\_/\\\\
( o.o )
 > ^ <
</ascii-art>
About the speaker
`);

  assert.equal(deck.slides[0]?.asciiArt, ' /\\_/\\\\\n( o.o )\n > ^ <');
  assert.equal(deck.slides[0]?.body, 'About the speaker');
});

test('parseSlides preserves leading spaces inside ascii-art blocks', () => {
  const deck = parseSlides(`
<ascii-art>
  __
 /  \\
/____\\
</ascii-art>
Caption
`);

  assert.equal(deck.slides[0]?.asciiArt, '  __\n /  \\\n/____\\');
});

test('parseSlides keeps the first qr block and ignores later ones', () => {
  const deck = parseSlides(`
<qr>
https://first.example
</qr>
<qr>
https://second.example
</qr>
Slide body
`);

  assert.equal(deck.slides[0]?.qrText, 'https://first.example');
  assert.equal(deck.slides[0]?.body, 'Slide body');
});

test('parseSlides defaults qr width to 30 percent and clamps extreme values', () => {
  const defaultDeck = parseSlides(`
<qr>
https://example.com
</qr>
`);
  const clampedDeck = parseSlides(`
<qr width=95%>
https://example.com
</qr>
`);

  assert.equal(defaultDeck.slides[0]?.qrWidthPercent, 30);
  assert.equal(clampedDeck.slides[0]?.qrWidthPercent, 90);
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
