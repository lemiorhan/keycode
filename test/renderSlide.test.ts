import test from 'node:test';
import assert from 'node:assert/strict';
import {renderSlideContent} from '../src/renderSlide.js';
import type {Slide} from '../src/types.js';

test('renderSlideContent renders title text inside a box and keeps body content', () => {
  const slide: Slide = {
    index: 0,
    raw: '<title>Hello</title>\nSpeaker',
    body: 'Speaker',
    isAsciiArt: true,
    hasQuestion: false,
    titleText: 'Hello',
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.match(rendered, /┌/);
  assert.match(rendered, /└/);
  assert.match(rendered, /HELLO|Hello/);
  assert.match(rendered, /Speaker/);
});

test('renderSlideContent appends question input after title/body content', () => {
  const slide: Slide = {
    index: 1,
    raw: '<title>Ask</title>\n[QUESTION]\nWhat now?',
    body: 'What now?',
    isAsciiArt: false,
    hasQuestion: true,
    titleText: 'Ask',
    size: 'normal'
  };

  const rendered = renderSlideContent({
    slide,
    questionInput: 'Ship it'
  });

  assert.match(rendered, /What now\?/);
  assert.match(rendered, /Answer: Ship it/);
});

test('renderSlideContent renders multi-line titles inside a padded box', () => {
  const slide: Slide = {
    index: 0,
    raw: '<title>Hello\nWorld</title>',
    body: '',
    isAsciiArt: true,
    hasQuestion: false,
    titleText: 'Hello\nWorld',
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});
  const lines = rendered.split('\n');

  assert.match(rendered, /┌/);
  assert.equal(rendered.includes('Hello'), true);
  assert.equal(rendered.includes('World'), true);
  assert.equal(lines.includes(''), false);
});

test('renderSlideContent increases vertical spacing for large slides', () => {
  const slide: Slide = {
    index: 2,
    raw: '<size>large</size>\nLine one\nLine two',
    body: 'Line one\nLine two',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'large'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.includes('Line one\n\nLine two'), true);
});
