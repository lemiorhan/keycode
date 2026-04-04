import type {Slide, SlideAlign} from './types.js';

export function slideDefaultAlign(slide: Slide | undefined): SlideAlign {
  if (slide?.titleText) {
    return 'center';
  }

  return slide?.align ?? (slide?.qrText ? 'left' : 'center');
}
