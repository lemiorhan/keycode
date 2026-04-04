const REVEAL_LINE_PATTERN = /^(\s*)(?<!=)=>(?:\s?)(.*)$/;
const GROUP_REVEAL_LINE_PATTERN = /^(\s*)==>(?:\s?)(.*)$/;
const ANSI_GRAY = '\x1b[90m';
const ANSI_RESET = '\x1b[39m';
const STRUCTURAL_TAG_LINE_PATTERN = /^\s*<[^>]+>\s*$/;

function isRevealLine(line: string): boolean {
  return GROUP_REVEAL_LINE_PATTERN.test(line) || REVEAL_LINE_PATTERN.test(line);
}

function isGroupRevealLine(line: string): boolean {
  return GROUP_REVEAL_LINE_PATTERN.test(line);
}

export function countRevealLines(content: string): number {
  const lines = content.split('\n');
  let count = 0;
  let inGroup = false;

  for (const line of lines) {
    if (isGroupRevealLine(line)) {
      if (!inGroup) {
        count += 1;
        inGroup = true;
      }
    } else {
      inGroup = false;

      if (REVEAL_LINE_PATTERN.test(line)) {
        count += 1;
      }
    }
  }

  return count;
}

export function applyRevealLines(content: string, revealCount: number): string {
  const totalRevealSteps = countRevealLines(content);
  const dimVisibleContext = totalRevealSteps > 0 && revealCount > 0;
  const lines = content.split('\n');

  // Assign each reveal line a step index (consecutive ==> lines share the same step)
  const stepAssignments = new Map<number, number>();
  let stepIndex = 0;
  let inGroup = false;

  for (let i = 0; i < lines.length; i++) {
    if (isGroupRevealLine(lines[i])) {
      if (!inGroup) {
        inGroup = true;
      }

      stepAssignments.set(i, stepIndex);
    } else {
      if (inGroup) {
        stepIndex += 1;
        inGroup = false;
      }

      if (REVEAL_LINE_PATTERN.test(lines[i])) {
        stepAssignments.set(i, stepIndex);
        stepIndex += 1;
      }
    }
  }

  const lastRevealedStep = revealCount - 1;

  return lines
    .flatMap((line, i) => {
      const step = stepAssignments.get(i);

      if (step === undefined) {
        if (STRUCTURAL_TAG_LINE_PATTERN.test(line)) {
          return [line];
        }

        if (!dimVisibleContext || line.trim().length === 0) {
          return [line];
        }

        return [`${ANSI_GRAY}${line}${ANSI_RESET}`];
      }

      if (step >= revealCount) {
        return [];
      }

      const groupMatch = line.match(GROUP_REVEAL_LINE_PATTERN);
      const singleMatch = !groupMatch ? line.match(REVEAL_LINE_PATTERN) : null;
      const leadingIndent = (groupMatch ?? singleMatch)?.[1] ?? '';
      const lineContent = (groupMatch ?? singleMatch)?.[2] ?? '';
      const rendered =
        step < lastRevealedStep
          ? `${ANSI_GRAY}${leadingIndent}${lineContent}${ANSI_RESET}`
          : `${leadingIndent}${lineContent}`;
      return [rendered];
    })
    .join('\n');
}
