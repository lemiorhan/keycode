const IMAGE_TAG_PATTERN = /<image\b(?!-url)([^>]*)\/?>/i;
const DEFAULT_IMAGE_WIDTH_PERCENT = 30;
export const IMAGE_ANCHOR_TOKEN = '__KEYCODE_IMAGE_ANCHOR__';

export function extractImageTag(
  content: string
): {
  body: string;
  imagePath?: string;
  imageWidthPercent?: number;
  imageBackgroundColor?: string;
} {
  const match = content.match(IMAGE_TAG_PATTERN);

  if (!match) {
    return {body: content};
  }

  const attributesText = match[1] ?? '';
  const pathMatch =
    attributesText.match(/\bpath=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/i);
  const widthMatch = attributesText.match(/\bwidth=(?:"|')?(\d{1,3})%(?:"|')?/i);
  const backgroundMatch =
    attributesText.match(/\bbg-color=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/i);
  const imagePath = (pathMatch?.[1] ?? pathMatch?.[2] ?? pathMatch?.[3] ?? '').trim();
  const imageBackgroundColor = (
    backgroundMatch?.[1] ??
    backgroundMatch?.[2] ??
    backgroundMatch?.[3] ??
    ''
  ).trim();
  const widthPercent = Number(widthMatch?.[1] ?? DEFAULT_IMAGE_WIDTH_PERCENT);
  const body = content
    .replace(IMAGE_TAG_PATTERN, IMAGE_ANCHOR_TOKEN)
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    body,
    imagePath: imagePath.length > 0 ? imagePath : undefined,
    imageWidthPercent: Math.min(Math.max(widthPercent, 10), 90),
    imageBackgroundColor: imageBackgroundColor.length > 0 ? imageBackgroundColor : undefined
  };
}
