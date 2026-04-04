import type {Slide} from './types.js';

export function shouldSkipTransition(slide: Slide | undefined, _renderedContent: string): boolean {
  return Boolean(slide?.aiSimulation);
}
