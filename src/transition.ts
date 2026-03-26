import type {TransitionFrame} from './types.js';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/[]{}+-_=';
const ANSI_PATTERN = /\x1B\[[0-9;]*m/g;

type TransitionToken =
  | {type: 'ansi'; value: string}
  | {type: 'char'; value: string; visibleIndex: number};

function randomGlyph(seed: number): string {
  return GLYPHS[seed % GLYPHS.length] ?? '#';
}

function tokenizeTarget(target: string): TransitionToken[] {
  const tokens: TransitionToken[] = [];
  let visibleIndex = 0;
  let lastIndex = 0;

  for (const match of target.matchAll(ANSI_PATTERN)) {
    const matchIndex = match.index ?? 0;
    const plainSegment = target.slice(lastIndex, matchIndex);

    for (const char of plainSegment) {
      tokens.push({
        type: 'char',
        value: char,
        visibleIndex
      });
      visibleIndex += 1;
    }

    tokens.push({
      type: 'ansi',
      value: match[0]
    });
    lastIndex = matchIndex + match[0].length;
  }

  const trailingSegment = target.slice(lastIndex);

  for (const char of trailingSegment) {
    tokens.push({
      type: 'char',
      value: char,
      visibleIndex
    });
    visibleIndex += 1;
  }

  return tokens;
}

export function buildTransitionFrames(
  target: string,
  totalSteps: number,
  deterministicSeed = 7
): TransitionFrame[] {
  const steps = Math.max(totalSteps, 1);
  const tokens = tokenizeTarget(target);
  const visibleChars = tokens.filter((token): token is Extract<TransitionToken, {type: 'char'}> => token.type === 'char');
  const visibleCharCount = visibleChars.length;

  return Array.from({length: steps}, (_, index) => {
    const revealRatio = (index + 1) / steps;
    const output = tokens
      .map((token) => {
        if (token.type === 'ansi') {
          return token.value;
        }

        if (token.value === '\n' || token.value === ' ') {
          return token.value;
        }

        const shouldReveal = token.visibleIndex / Math.max(visibleCharCount - 1, 1) <= revealRatio;
        return shouldReveal
          ? token.value
          : randomGlyph(deterministicSeed + index + token.visibleIndex * 13);
      })
      .join('');

    return {
      step: index + 1,
      totalSteps: steps,
      output
    };
  });
}
