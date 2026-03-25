import test from 'node:test';
import assert from 'node:assert/strict';
import {renderSlideContent} from '../src/renderSlide.js';
import type {Slide} from '../src/types.js';

test('renderSlideContent turns title text into ascii art and keeps body content', () => {
  const slide: Slide = {
    index: 0,
    raw: '<title>Hello</title>\nSpeaker',
    body: 'Speaker',
    isAsciiArt: true,
    hasQuestion: false,
    titleText: 'Hello'
  };

  const rendered = renderSlideContent({slide});

  assert.match(rendered, /█/);
  assert.match(rendered, /Speaker/);
});

test('renderSlideContent appends question input after title/body content', () => {
  const slide: Slide = {
    index: 1,
    raw: '<title>Ask</title>\n[QUESTION]\nWhat now?',
    body: 'What now?',
    isAsciiArt: false,
    hasQuestion: true,
    titleText: 'Ask'
  };

  const rendered = renderSlideContent({
    slide,
    questionInput: 'Ship it'
  });

  assert.match(rendered, /What now\?/);
  assert.match(rendered, /Answer: Ship it/);
});

test('renderSlideContent renders multi-line titles as separate ascii blocks', () => {
  const slide: Slide = {
    index: 0,
    raw: '<title>Hello\nWorld</title>',
    body: '',
    isAsciiArt: true,
    hasQuestion: false,
    titleText: 'Hello\nWorld'
  };

  const rendered = renderSlideContent({slide});
  const lines = rendered.split('\n');

  assert.match(rendered, /█/);
  assert.equal(rendered.includes('H'), false);
  assert.equal(lines.includes(''), true);
});
