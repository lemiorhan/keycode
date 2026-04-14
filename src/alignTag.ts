import type {SlideAlign} from './types.js';

const ALIGN_TAG_PATTERN = /<align>\s*(left|center|right)\s*<\/align>/i;
const PARAGRAPH_ALIGN_PATTERN = /<p\b[^>]*\balign=(?:"|')?(left|center|right)(?:"|')?[^>]*>/i;

export function extractSlideAlign(content: string): {body: string; align?: SlideAlign} {
  const match = content.match(ALIGN_TAG_PATTERN);

  if (match) {
    return {
      body: content.replace(ALIGN_TAG_PATTERN, '\n').replace(/\n{3,}/g, '\n\n').trim(),
      align: match[1].toLowerCase() as SlideAlign
    };
  }

  const paragraphMatch = content.match(PARAGRAPH_ALIGN_PATTERN);

  if (paragraphMatch) {
    return {
      body: content,
      align: paragraphMatch[1].toLowerCase() as SlideAlign
    };
  }

  return {
    body: content
  };
}
