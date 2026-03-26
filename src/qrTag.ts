const QR_TAG_PATTERN = /<qr>\s*([\s\S]*?)\s*<\/qr>/i;
const ALL_QR_TAGS_PATTERN = /<qr>\s*[\s\S]*?\s*<\/qr>/gi;

export function extractQrBlock(content: string): {body: string; qrText?: string} {
  const match = content.match(QR_TAG_PATTERN);

  if (!match) {
    return {body: content};
  }

  const qrText = match[1].trim();
  const body = content
    .replace(QR_TAG_PATTERN, '\n')
    .replace(ALL_QR_TAGS_PATTERN, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    body,
    qrText: qrText.length > 0 ? qrText : undefined
  };
}
