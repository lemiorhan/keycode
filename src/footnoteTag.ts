const FOOTNOTE_TAG_PATTERN = /<footnote>\s*([\s\S]*?)\s*<\/footnote>/i;

export function extractFootnoteBlock(content: string): {body: string; footnote?: string} {
  const match = content.match(FOOTNOTE_TAG_PATTERN);

  if (!match) {
    return {body: content};
  }

  const footnote = match[1].trim();
  const body = content
    .replace(FOOTNOTE_TAG_PATTERN, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    body,
    footnote: footnote.length > 0 ? footnote : undefined
  };
}
