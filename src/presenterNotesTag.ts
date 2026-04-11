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
    .split(/\n{2,}/)
    .map((paragraph) => {
      const lines = paragraph
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const result: string[] = [];

      for (const line of lines) {
        if (/^\*\s/.test(line)) {
          result.push(`• ${line.slice(1).trim()}`);
        } else if (result.length > 0) {
          result[result.length - 1] = `${result[result.length - 1]} ${line}`;
        } else {
          result.push(line);
        }
      }

      return result.join('\n');
    })
    .join('\n\n');
}
