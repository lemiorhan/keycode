import type {QuestionState, Slide} from './types.js';
import {renderInlineColors} from './colorText.js';
import {renderParagraphBlocks} from './paragraphTag.js';
import {renderTitleAscii} from './titleArt.js';

const FOOTNOTE_COLOR = '\x1b[90m';
const ANSI_RESET = '\x1b[39m';
const DECORATION_COLOR = '\x1b[90m';

function renderBeautifyBands(size: Slide['size']): {top: string; bottom: string} {
  const top = [
    `${DECORATION_COLOR}        .       *        .          *       .${ANSI_RESET}`,
    `${DECORATION_COLOR}    *      _/\\\\_        .      _/\\\\_       *${ANSI_RESET}`,
    `${DECORATION_COLOR}       .   \\    /   *       .   \\    /   .${ANSI_RESET}`
  ];
  const bottom = [
    `${DECORATION_COLOR}       .   /____\\      .  *    /____\\    .${ANSI_RESET}`,
    `${DECORATION_COLOR}    *        .        *         .       *${ANSI_RESET}`
  ];

  if (size === 'xlarge') {
    top.unshift(`${DECORATION_COLOR}   .         *             .             *       .${ANSI_RESET}`);
    bottom.push(`${DECORATION_COLOR}   .        *            .            *        .${ANSI_RESET}`);
  }

  return {
    top: top.join('\n'),
    bottom: bottom.join('\n')
  };
}

interface RenderSlideOptions {
  slide: Slide;
  answer?: QuestionState;
  questionInput?: string;
  mediaError?: string;
}

export function renderSlideTextContent(options: RenderSlideOptions): string {
  const {slide, answer, questionInput = '', mediaError} = options;
  const sections: string[] = [];

  if (slide.titleText) {
    sections.push(renderTitleAscii(slide.titleText, slide.size));
  }

  if (slide.body.trim().length > 0) {
    const spacing = slide.size === 'normal' ? '\n' : '\n\n';
    const bodyWithParagraphs = renderParagraphBlocks(slide.body.trimEnd());
    sections.push(renderInlineColors(bodyWithParagraphs.split('\n').join(spacing)));
  }

  if (slide.hasQuestion) {
    sections.push(`Answer: ${answer?.answer ?? questionInput}`);
  }

  if (mediaError) {
    sections.push(mediaError);
  }

  if (slide.beautify) {
    const decoration = renderBeautifyBands(slide.size);
    sections.unshift(decoration.top);
    sections.push(decoration.bottom);
  }

  return sections.join('\n\n').trimEnd();
}

export function renderSlideFootnote(slide: Slide): string | undefined {
  if (!slide.footnote?.trim()) {
    return undefined;
  }

  return slide.footnote
    .trimEnd()
    .split('\n')
    .map((line) => `${FOOTNOTE_COLOR}${renderInlineColors(line)}${ANSI_RESET}`)
    .join('\n');
}

export function renderSlideContent(options: RenderSlideOptions): string {
  return renderSlideTextContent(options);
}
