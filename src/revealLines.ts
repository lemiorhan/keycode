const REVEAL_LINE_PATTERN = /^(\s*)=>(?:\s?)(.*)$/;
const ANSI_GRAY = '\x1b[90m';
const ANSI_RESET = '\x1b[39m';
const STRUCTURAL_TAG_LINE_PATTERN = /^\s*<[^>]+>\s*$/;

export function countRevealLines(content: string): number {
  return content
    .split('\n')
    .filter((line) => REVEAL_LINE_PATTERN.test(line))
    .length;
}

export function applyRevealLines(content: string, revealCount: number): string {
  const totalRevealLines = countRevealLines(content);
  let remaining = Math.max(revealCount, 0);
  let revealedIndex = 0;
  const dimVisibleContext = totalRevealLines > 0 && revealCount > 0;

  return content
    .split('\n')
    .flatMap((line) => {
      const match = line.match(REVEAL_LINE_PATTERN);

      if (!match) {
        if (STRUCTURAL_TAG_LINE_PATTERN.test(line)) {
          return [line];
        }

        if (!dimVisibleContext || line.trim().length === 0) {
          return [line];
        }

        return [`${ANSI_GRAY}${line}${ANSI_RESET}`];
      }

      if (remaining <= 0) {
        return [];
      }

      remaining -= 1;
      const leadingIndent = match[1] ?? '';
      const lineContent = match[2] ?? '';
      const rendered =
        revealedIndex < revealCount - 1
          ? `${ANSI_GRAY}${leadingIndent}${lineContent}${ANSI_RESET}`
          : `${leadingIndent}${lineContent}`;
      revealedIndex += 1;
      return [rendered];
    })
    .join('\n');
}
