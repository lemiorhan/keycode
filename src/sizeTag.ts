import type {SlideSize} from './types.js';

const SIZE_TAG_PATTERN = /<size>\s*(normal|large|xlarge)\s*<\/size>/i;

export function extractSlideSize(content: string): {body: string; size: SlideSize} {
  const match = content.match(SIZE_TAG_PATTERN);

  if (!match) {
    return {
      body: content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').trimEnd(),
      size: 'normal'
    };
  }

  return {
    body: content
      .replace(SIZE_TAG_PATTERN, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\n+/, '')
      .trimEnd(),
    size: match[1].toLowerCase() as SlideSize
  };
}
