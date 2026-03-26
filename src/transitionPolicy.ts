import type {Slide} from './types.js';

export function shouldSkipTransition(slide: Slide | undefined, renderedContent: string): boolean {
  if (!slide) {
    return false;
  }

  return Boolean(slide.qrText) || renderedContent.includes('\x1b[');
}
