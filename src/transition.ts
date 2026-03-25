import type {TransitionFrame} from './types.js';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/[]{}+-_=';

function randomGlyph(seed: number): string {
  return GLYPHS[seed % GLYPHS.length] ?? '#';
}

export function buildTransitionFrames(
  target: string,
  totalSteps: number,
  deterministicSeed = 7
): TransitionFrame[] {
  const steps = Math.max(totalSteps, 1);
  const chars = [...target];

  return Array.from({length: steps}, (_, index) => {
    const revealRatio = (index + 1) / steps;
    const output = chars
      .map((char, charIndex) => {
        if (char === '\n' || char === ' ') {
          return char;
        }

        const shouldReveal = charIndex / Math.max(chars.length - 1, 1) <= revealRatio;
        return shouldReveal ? char : randomGlyph(deterministicSeed + index + charIndex * 13);
      })
      .join('');

    return {
      step: index + 1,
      totalSteps: steps,
      output
    };
  });
}
