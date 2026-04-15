const PRESENTER_NOTES_PATTERN = /\/\*\s*PRESENTER\s+NOTES\s*:\s*\n([\s\S]*?)\*\//i;

export function extractPresenterNotes(raw: string): string | undefined {
  const match = raw.match(PRESENTER_NOTES_PATTERN);

  if (!match) {
    return undefined;
  }

  const trimmed = match[1]
    .replace(/^\n+/, '')
    .replace(/\n+$/, '');

  return trimmed
    .split('\n')
    .map((line) => {
      const stripped = line.trim();

      if (/^\*\s/.test(stripped)) {
        return `• ${stripped.slice(1).trim()}`;
      }

      return stripped;
    })
    .join('\n');
}
