const QR_TAG_PATTERN = /<qr\b([^>]*)>\s*([\s\S]*?)\s*<\/qr>/i;
const ALL_QR_TAGS_PATTERN = /<qr\b[^>]*>\s*[\s\S]*?\s*<\/qr>/gi;
const DEFAULT_QR_WIDTH_PERCENT = 30;

export function extractQrBlock(
  content: string
): {body: string; qrText?: string; qrWidthPercent?: number} {
  const match = content.match(QR_TAG_PATTERN);

  if (!match) {
    return {body: content};
  }

  const attributesText = match[1] ?? '';
  const widthMatch = attributesText.match(/\bwidth=(?:"|')?(\d{1,3})%(?:"|')?/i);
  const qrText = match[2].trim();
  const body = content
    .replace(QR_TAG_PATTERN, '\n')
    .replace(ALL_QR_TAGS_PATTERN, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    body,
    qrText: qrText.length > 0 ? qrText : undefined,
    qrWidthPercent: Math.min(
      Math.max(Number(widthMatch?.[1] ?? DEFAULT_QR_WIDTH_PERCENT), 10),
      90
    )
  };
}
