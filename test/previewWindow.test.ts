import test from 'node:test';
import assert from 'node:assert/strict';
import {renderPreviewContent} from '../src/previewWindow.js';
import type {Slide} from '../src/types.js';

const ROWS = 24;
const COLS = 80;

function makeSlide(overrides: Partial<Slide> = {}): Slide {
  return {
    index: 0,
    raw: '',
    body: '',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal',
    ...overrides
  };
}

function preview(slide: Slide, slides?: Slide[], slideIndex?: number): string {
  const allSlides = slides ?? [slide];
  return renderPreviewContent({
    slides: allSlides,
    slideIndex: slideIndex ?? allSlides.indexOf(slide),
    rows: ROWS,
    columns: COLS,
    deckDirectory: '/tmp/test-deck'
  });
}

test('renderPreviewContent renders body text with layout centering', () => {
  const slide = makeSlide({body: 'Hello world'});
  const result = preview(slide);
  assert.match(result, /Hello world/);
  const bodyLine = result.split('\n').find((l) => l.includes('Hello world'));
  assert.ok(bodyLine && bodyLine.startsWith(' '));
});

test('renderPreviewContent includes header when present', () => {
  const slide = makeSlide({
    body: 'Content',
    headerText: 'Agenda',
    headerColor: 'cyan'
  });
  const result = preview(slide);
  assert.match(result, /Content/);
  assert.match(result, /AGENDA|Agenda/i);
});

test('renderPreviewContent includes footnote when present', () => {
  const slide = makeSlide({
    body: 'Content',
    footnote: 'Source: example.com'
  });
  const result = preview(slide);
  assert.match(result, /Content/);
  assert.match(result, /Source: example\.com/);
});

test('renderPreviewContent shows all reveal lines without gray dimming', () => {
  const slide = makeSlide({body: '=> First\n=> Second\n=> Third'});
  const result = preview(slide);
  assert.match(result, /First/);
  assert.match(result, /Second/);
  assert.match(result, /Third/);
  assert.ok(!result.includes('=>'));
  const grayWrapped = result.match(/\x1b\[90m.*First/);
  assert.equal(grayWrapped, null);
});

test('renderPreviewContent shows group reveal lines without gray dimming', () => {
  const slide = makeSlide({body: 'Intro text\n==> Step A\n==> Step B'});
  const result = preview(slide);
  assert.match(result, /Intro text/);
  assert.match(result, /Step A/);
  assert.match(result, /Step B/);
  const grayIntro = result.match(/\x1b\[90mIntro text/);
  assert.equal(grayIntro, null);
});

test('renderPreviewContent handles empty body gracefully', () => {
  const slide = makeSlide({body: ''});
  const result = preview(slide);
  assert.equal(typeof result, 'string');
});

test('renderPreviewContent uses ascii art stacked layout', () => {
  const slide = makeSlide({
    body: 'Description',
    asciiArt: '  /\\_/\\  \n ( o.o ) '
  });
  const result = preview(slide);
  assert.match(result, /Description/);
  assert.match(result, /o\.o/);
});

test('renderPreviewContent shows slide number overlay', () => {
  const slides = [
    makeSlide({body: 'First', slideNumber: {hAlign: 'right', vAlign: 'bottom'}}),
    makeSlide({body: 'Second'})
  ];
  const result = renderPreviewContent({
    slides,
    slideIndex: 1,
    rows: ROWS,
    columns: COLS,
    deckDirectory: '/tmp/test-deck'
  });
  assert.match(result, /2/);
});

test('renderPreviewContent replaces image anchor with ascii box placeholder', () => {
  const slide = makeSlide({
    body: 'Text here\n__KEYCODE_IMAGE_ANCHOR__',
    imagePath: 'nonexistent.png'
  });
  const result = preview(slide);
  assert.ok(!result.includes('__KEYCODE_IMAGE_ANCHOR__'));
  assert.match(result, /┌/);
  assert.match(result, /└/);
  assert.match(result, /\[image:/);
});
