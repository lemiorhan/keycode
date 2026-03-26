const BEAUTIFY_TAG_PATTERN = /<beautify\s*\/>/i;

export function extractBeautifyTag(content: string): {body: string; beautify: boolean} {
  const match = content.match(BEAUTIFY_TAG_PATTERN);

  if (!match) {
    return {body: content, beautify: false};
  }

  return {
    body: content.replace(BEAUTIFY_TAG_PATTERN, '\n').replace(/\n{3,}/g, '\n\n').trim(),
    beautify: true
  };
}
