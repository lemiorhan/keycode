import test from 'node:test';
import assert from 'node:assert/strict';
import {parseSlides} from '../src/parser.js';
import {resolveActiveSlideNumber} from '../src/slideNumber.js';

test('resolveActiveSlideNumber activates on and after the defining slide', () => {
  const deck = parseSlides(`
Intro
---
<slide-number v-align=top h-align=left/>
Body
---
Wrap-up
`);

  assert.equal(resolveActiveSlideNumber(deck.slides, 0), undefined);
  assert.deepEqual(resolveActiveSlideNumber(deck.slides, 1), {
    vAlign: 'top',
    hAlign: 'left',
    value: '2'
  });
  assert.deepEqual(resolveActiveSlideNumber(deck.slides, 2), {
    vAlign: 'top',
    hAlign: 'left',
    value: '3'
  });
});

test('resolveActiveSlideNumber uses the latest directive when later slides redefine it', () => {
  const deck = parseSlides(`
<slide-number v-align=top h-align=left/>
First
---
Second
---
<slide-number v-align=bottom h-align=right/>
Third
---
Fourth
`);

  assert.deepEqual(resolveActiveSlideNumber(deck.slides, 1), {
    vAlign: 'top',
    hAlign: 'left',
    value: '2'
  });
  assert.deepEqual(resolveActiveSlideNumber(deck.slides, 2), {
    vAlign: 'bottom',
    hAlign: 'right',
    value: '3'
  });
  assert.deepEqual(resolveActiveSlideNumber(deck.slides, 3), {
    vAlign: 'bottom',
    hAlign: 'right',
    value: '4'
  });
});
