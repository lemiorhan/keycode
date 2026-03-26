const ASCII_ART_TAG_PATTERN = /<ascii-art\b([^>]*)>([\s\S]*?)<\/ascii-art>/i;

export function extractAsciiArtBlock(
  content: string
): {body: string; asciiArt?: string} {
  const match = content.match(ASCII_ART_TAG_PATTERN);

  if (!match) {
    return {body: content};
  }

  const asciiArt = match[2]
    .replace(/\r\n/g, '\n')
    .replace(/^\n/, '')
    .replace(/\n$/, '');
  const body = content
    .replace(ASCII_ART_TAG_PATTERN, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    body,
    asciiArt: asciiArt.length > 0 ? asciiArt : undefined
  };
}
