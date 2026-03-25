import type {QuestionState, Slide} from './types.js';
import {renderTitleAscii} from './titleArt.js';

interface RenderSlideOptions {
  slide: Slide;
  answer?: QuestionState;
  questionInput?: string;
}

export function renderSlideTextContent(options: RenderSlideOptions): string {
  const {slide, answer, questionInput = ''} = options;
  const sections: string[] = [];

  if (slide.titleText) {
    sections.push(renderTitleAscii(slide.titleText, slide.size));
  }

  if (slide.body.trim().length > 0) {
    const spacing = slide.size === 'normal' ? '\n' : '\n\n';
    sections.push(slide.body.trimEnd().split('\n').join(spacing));
  }

  if (slide.hasQuestion) {
    sections.push(`Answer: ${answer?.answer ?? questionInput}`);
  }

  return sections.join('\n\n').trimEnd();
}

export function renderSlideContent(options: RenderSlideOptions): string {
  return renderSlideTextContent(options);
}
