import type {QuestionState, Slide} from './types.js';
import {renderTitleAscii} from './titleArt.js';

interface RenderSlideOptions {
  slide: Slide;
  answer?: QuestionState;
  questionInput?: string;
  imageAscii?: string;
}

export function renderSlideTextContent(options: Omit<RenderSlideOptions, 'imageAscii'>): string {
  const {slide, answer, questionInput = ''} = options;
  const sections: string[] = [];

  if (slide.titleText) {
    sections.push(renderTitleAscii(slide.titleText));
  }

  if (slide.body.trim().length > 0) {
    sections.push(slide.body.trimEnd());
  }

  if (slide.hasQuestion) {
    sections.push(`Answer: ${answer?.answer ?? questionInput}`);
  }

  return sections.join('\n\n').trimEnd();
}

export function renderSlideContent(options: RenderSlideOptions): string {
  const {slide, imageAscii} = options;
  const sections: string[] = [];

  if (imageAscii) {
    sections.push(imageAscii);
  }

  const textContent = renderSlideTextContent(options);

  if (textContent) {
    sections.push(textContent);
  }

  return sections.join('\n\n').trimEnd();
}
