import type {Slide} from './types.js';

export function shouldSkipTransition(_slide: Slide | undefined, _renderedContent: string): boolean {
  return false;
}
