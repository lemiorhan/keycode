import type {SlideAlign, SlideScreen} from './types.js';

const SCREEN_TAG_PATTERN = /<screen\b([^>]*)>\s*<\/screen>/gi;

export function extractScreenTags(content: string): {body: string; screens?: SlideScreen[]} {
  const screens: SlideScreen[] = [];

  for (const match of content.matchAll(SCREEN_TAG_PATTERN)) {
    const attributesText = match[1] ?? '';
    const alignMatch = attributesText.match(/\bcontent-align=(?:"|')?(left|center|right)(?:"|')?/i);
    const widthMatch = attributesText.match(/\bwidth=(?:"|')?(\d{1,3})%(?:"|')?/i);

    screens.push({
      contentAlign: (alignMatch?.[1]?.toLowerCase() as SlideAlign | undefined) ?? 'center',
      widthPercent: Math.min(Math.max(Number(widthMatch?.[1] ?? 50), 10), 90)
    });
  }

  const body = content
    .replace(SCREEN_TAG_PATTERN, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    body,
    screens: screens.length > 0 ? screens.slice(0, 2) : undefined
  };
}
