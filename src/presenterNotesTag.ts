const PRESENTER_NOTES_PATTERN = /\/\*\s*PRESENTER\s+NOTES\s*:\s*\n([\s\S]*?)\*\//i;

export function extractPresenterNotes(raw: string): string | undefined {
  const match = raw.match(PRESENTER_NOTES_PATTERN);

  if (!match) {
    return undefined;
  }

  return match[1]
    .replace(/^\n+/, '')
    .replace(/\n+$/, '')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n');
}
