import type {SlideAlign, SlideNumberDirective, SlideVerticalAlign} from './types.js';

const SLIDE_NUMBER_TAG_PATTERN = /<slide-number\b([^>]*)\/>/i;

export function extractSlideNumberTag(content: string): {
  body: string;
  slideNumber?: SlideNumberDirective;
} {
  const match = content.match(SLIDE_NUMBER_TAG_PATTERN);

  if (!match) {
    return {
      body: content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').trimEnd()
    };
  }

  const attributesText = match[1] ?? '';
  const hAlign = (
    attributesText.match(/\bh-align=(?:"|')?(left|center|right)(?:"|')?/i)?.[1]?.toLowerCase() ??
    'right'
  ) as SlideAlign;
  const vAlign = (
    attributesText.match(/\bv-align=(?:"|')?(top|bottom)(?:"|')?/i)?.[1]?.toLowerCase() ??
    'bottom'
  ) as SlideVerticalAlign;
  const body = content
    .replace(SLIDE_NUMBER_TAG_PATTERN, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trimEnd();

  return {
    body,
    slideNumber: {
      hAlign,
      vAlign
    }
  };
}
