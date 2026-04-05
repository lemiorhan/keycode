import test from 'node:test';
import assert from 'node:assert/strict';
import {renderSlideContent, renderSlideFootnote, renderSlideHeader} from '../src/renderSlide.js';
import type {Slide} from '../src/types.js';

test('renderSlideContent renders title text inside a box and keeps body content', () => {
  const slide: Slide = {
    index: 0,
    raw: '<title>Hello</title>\nSpeaker',
    body: 'Speaker',
    isAsciiArt: true,
    hasQuestion: false,
    titleText: 'Hello',
    align: 'center',
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
    align: 'center',
    size: 'normal'
  };

  const rendered = renderSlideContent({
    slide,
    questionInput: 'Ship it'
  });

  assert.match(rendered, /What now\?/);
  assert.match(rendered, /Answer: Ship it/);
  assert.equal(rendered.includes('What now?\n\nAnswer: Ship it'), false);
  assert.equal(rendered.includes('What now?\nAnswer: Ship it'), true);
});

test('renderSlideContent renders ai question input and spinner before completion', () => {
  const slide: Slide = {
    index: 1,
    raw: '[QUESTION]\nInvestigate',
    body: 'Investigate',
    isAsciiArt: false,
    hasQuestion: true,
    aiSimulation: {
      intervalMinMs: 3000,
      intervalMaxMs: 5000,
      steps: [{content: '<color fg="green">[OK]</color> Connecting...'}],
      finalContent: 'ANALYSIS COMPLETE'
    },
    size: 'normal'
  };

  const rendered = renderSlideContent({
    slide,
    answer: {slideIndex: 1, answer: 'Why is throughput low?'},
    aiSimulationProgress: {emittedStepCount: 0, isComplete: false},
    aiSimulationSpinnerFrame: '⠋'
  });

  assert.match(rendered, /Investigate/);
  assert.match(rendered, /> Why is throughput low\?/);
  assert.match(rendered, /⠋ Thinking\.\.\./);
  assert.equal(rendered.includes('Investigate\n\n> Why is throughput low?'), false);
  assert.equal(rendered.includes('Investigate\n> Why is throughput low?'), true);
});

test('renderSlideContent keeps a paragraph-wrapped question prompt directly under the sentence', () => {
  const slide: Slide = {
    index: 1,
    raw: '<p max-width=72 align=left>\\nCompared to humans, how does AI-generated code affect question churn?\\n</p>',
    body: '<p max-width=72 align=left>\nCompared to humans, how does AI-generated code affect question churn?\n</p>',
    isAsciiArt: false,
    hasQuestion: true,
    size: 'normal'
  };

  const rendered = renderSlideContent({
    slide,
    questionInput: ''
  });

  const lines = rendered.split('\n');

  assert.match(lines[0] ?? '', /Compared to humans, how does AI-generated code affect question churn\?/);
  assert.equal(lines[1], 'Answer: \x1b[39m');
  assert.notEqual(lines[0], '');
});

test('renderSlideContent preserves paragraph padding for one-line questions', () => {
  const slide: Slide = {
    index: 1,
    raw: '<p max-width=72 align=left>Compared to humans, how good is the quality of AI-generated code?</p>',
    body: '<p max-width=72 align=left>Compared to humans, how good is the quality of AI-generated code?</p>',
    isAsciiArt: false,
    hasQuestion: true,
    aiSimulation: {
      intervalMinMs: 3000,
      intervalMaxMs: 5000,
      steps: [{content: 'hello'}]
    },
    size: 'normal'
  };

  const rendered = renderSlideContent({
    slide,
    questionInput: ''
  });

  const lines = rendered.split('\n');
  assert.match(lines[0] ?? '', /Compared to humans, how good is the quality of AI-generated code\?/);
  assert.equal(lines[1], '> \x1b[39m');
});

test('renderSlideContent renders streamed ai steps and final content with colors and paragraphs', () => {
  const slide: Slide = {
    index: 1,
    raw: '[QUESTION]\nInvestigate',
    body: 'Investigate',
    isAsciiArt: false,
    hasQuestion: true,
    aiSimulation: {
      intervalMinMs: 3000,
      intervalMaxMs: 5000,
      steps: [
        {content: '<color fg="green">[OK]</color> Connecting...'},
        {content: '<p max-width=18 align=left>Sampling 153 million lines of code...</p>'}
      ],
      finalContent:
        '<color fg="red">ANALYSIS COMPLETE:</color> THE REVOLUTION IS LEAKING.'
    },
    size: 'normal'
  };

  const rendered = renderSlideContent({
    slide,
    answer: {slideIndex: 1, answer: 'Why is throughput low?'},
    aiSimulationProgress: {emittedStepCount: 2, isComplete: true}
  });

  assert.match(rendered, /\x1b\[32m\[OK]\x1b\[37m Connecting\.\.\./);
  assert.match(rendered, /Sampling 153/);
  assert.match(rendered, /million lines of/);
  assert.match(rendered, /\x1b\[31mANALYSIS COMPLETE:\x1b\[37m THE REVOLUTION IS LEAKING\./);
});

test('renderSlideContent renders multi-line titles inside a padded box', () => {
  const slide: Slide = {
    index: 0,
    raw: '<title>Hello\nWorld</title>',
    body: '',
    isAsciiArt: true,
    hasQuestion: false,
    titleText: 'Hello\nWorld',
    align: 'center',
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
    align: 'center',
    size: 'large'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.includes('Line one\n\nLine two'), true);
});

test('renderSlideContent renders inline foreground colors with ansi escapes', () => {
  const slide: Slide = {
    index: 3,
    raw: 'This is <color fg="cyan">highlighted</color> text',
    body: 'This is <color fg="cyan">highlighted</color> text',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.includes('<color'), false);
  assert.match(rendered, /\x1b\[36mhighlighted\x1b\[37m/);
});

test('renderSlideContent hides and reveals lines that start with =>', () => {
  const slide: Slide = {
    index: 3,
    raw: 'Always visible\n=> First reveal\n=> Second reveal\nDone',
    body: 'Always visible\n=> First reveal\n=> Second reveal\nDone',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const hidden = renderSlideContent({slide, revealCount: 0});
  const first = renderSlideContent({slide, revealCount: 1});
  const second = renderSlideContent({slide, revealCount: 2});

  assert.equal(hidden.includes('First reveal'), false);
  assert.equal(hidden.includes('Second reveal'), false);
  assert.match(first, /\x1b\[90mAlways visible\x1b\[39m/);
  assert.match(first, /First reveal/);
  assert.equal(first.includes('Second reveal'), false);
  assert.match(first, /\x1b\[90mDone\x1b\[39m/);
  assert.match(second, /\x1b\[90mFirst reveal\x1b\[39m/);
  assert.match(second, /Second reveal/);
});

test('renderSlideContent renders multi-line foreground color spans with ansi escapes', () => {
  const slide: Slide = {
    index: 3,
    raw: '<color fg="cyan">First line\nSecond line</color>',
    body: '<color fg="cyan">First line\nSecond line</color>',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.includes('<color'), false);
  assert.match(rendered, /\x1b\[36mFirst line\nSecond line\x1b\[37m/);
});

test('renderSlideContent renders color tags inside title boxes', () => {
  const slide: Slide = {
    index: 3,
    raw: '<title><color fg="yellow">Hello</color>\nWorld</title>',
    body: '',
    isAsciiArt: false,
    hasQuestion: false,
    titleText: '<color fg="yellow">Hello</color>\nWorld',
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.includes('<color'), false);
  assert.match(rendered, /\x1b\[33mHello\x1b\[37m/);
  assert.match(rendered, /World/);
  assert.match(rendered, /┌/);
});

test('renderSlideHeader renders a banner line instead of a box', () => {
  const slide: Slide = {
    index: 4,
    raw: '<header color=cyan>Architecture</header>',
    body: '',
    headerText: 'Architecture',
    headerColor: 'cyan',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideHeader(slide);

  assert.equal(rendered?.includes('┌') ?? false, false);
  assert.match(rendered ?? '', /\.=~+/);
  assert.match(rendered ?? '', /ARCHITECTURE/);
  assert.match(rendered ?? '', /\x1b\[36mARCHITECTURE\x1b\[37m/);
});

test('renderSlideFootnote renders multi-line gray footnotes', () => {
  const slide: Slide = {
    index: 4,
    raw: '<footnote>Source\nSecond line</footnote>',
    body: '',
    footnote: 'Source\nSecond line',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideFootnote(slide);

  assert.match(rendered ?? '', /\x1b\[90mSource\x1b\[39m/);
  assert.match(rendered ?? '', /\x1b\[90mSecond line\x1b\[39m/);
});

test('renderSlideContent soft-wraps paragraph blocks to max width', () => {
  const slide: Slide = {
    index: 5,
    raw: '<p max-width=12>Alpha beta gamma delta</p>',
    body: '<p max-width=12>Alpha beta gamma delta</p>',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.includes('<p'), false);
  assert.match(rendered, /Alpha beta/);
  assert.match(rendered, /gamma delta/);
});

test('renderSlideContent supports align as a paragraph property', () => {
  const slide: Slide = {
    index: 6,
    raw: '<p max-width=12 align=right>Alpha beta</p>',
    body: '<p max-width=12 align=right>Alpha beta</p>',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.split('\n')[0], '\x1b[37m  Alpha beta\x1b[39m');
});

test('renderSlideContent preserves explicit newlines inside paragraph blocks', () => {
  const slide: Slide = {
    index: 7,
    raw: '<p max-width=12>Alpha beta\ngamma delta\n\nepsilon zeta</p>',
    body: '<p max-width=12>Alpha beta\ngamma delta\n\nepsilon zeta</p>',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  const lines = rendered.split('\n');

  assert.equal(lines.length, 4);
  assert.match(lines[0] ?? '', /Alpha beta/);
  assert.match(lines[1] ?? '', /gamma delta/);
  assert.equal(lines[2]?.trim(), '');
  assert.match(lines[3] ?? '', /epsilon zeta/);
});

test('renderSlideContent preserves inline colors inside paragraph blocks', () => {
  const slide: Slide = {
    index: 8,
    raw: '<p max-width=24 align=left>Alpha <color fg="cyan">beta gamma</color> delta</p>',
    body: '<p max-width=24 align=left>Alpha <color fg="cyan">beta gamma</color> delta</p>',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.equal(rendered.includes('<color'), false);
  assert.match(rendered, /\x1b\[36m beta gamma\x1b\[37m/);
});

test('renderSlideContent appends media errors after the slide body', () => {
  const slide: Slide = {
    index: 9,
    raw: 'Body',
    body: 'Body',
    isAsciiArt: false,
    hasQuestion: false,
    size: 'normal'
  };

  const rendered = renderSlideContent({
    slide,
    mediaError: '[image not found: lemi.png]'
  });

  assert.equal(rendered, '\x1b[37mBody\n\n[image not found: lemi.png]\x1b[39m');
});

test('renderSlideContent adds decorative ascii bands when beautify is enabled', () => {
  const slide: Slide = {
    index: 9,
    raw: '<beautify/>\n<title>Hello</title>',
    body: '',
    beautify: true,
    isAsciiArt: false,
    hasQuestion: false,
    titleText: 'Hello',
    size: 'normal'
  };

  const rendered = renderSlideContent({slide});

  assert.match(rendered, /_\/\\\\_/);
  assert.match(rendered, /\/____\\/);
});
