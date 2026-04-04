import type {Slide, SlideNumberDirective} from './types.js';

export interface ActiveSlideNumber extends SlideNumberDirective {
  value: string;
}

export function resolveActiveSlideNumber(
  slides: Slide[],
  slideIndex: number
): ActiveSlideNumber | undefined {
  if (slides.length === 0 || slideIndex < 0) {
    return undefined;
  }

  const boundedSlideIndex = Math.min(slideIndex, slides.length - 1);
  let directive: SlideNumberDirective | undefined;

  for (let index = 0; index <= boundedSlideIndex; index += 1) {
    directive = slides[index]?.slideNumber ?? directive;
  }

  if (!directive) {
    return undefined;
  }

  return {
    ...directive,
    value: String(boundedSlideIndex + 1)
  };
}
