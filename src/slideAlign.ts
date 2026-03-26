import type {Slide, SlideAlign} from './types.js';

export function slideDefaultAlign(slide: Slide | undefined): SlideAlign {
  return slide?.align ?? (slide?.qrText ? 'left' : 'center');
}
