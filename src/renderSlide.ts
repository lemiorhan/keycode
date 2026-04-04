import type {QuestionState, Slide} from './types.js';
import type {AiSimulationProgress} from './aiSimulation.js';
import {renderInlineColors} from './colorText.js';
import {renderParagraphBlocks} from './paragraphTag.js';
import {applyRevealLines} from './revealLines.js';
import {renderHeaderAscii, renderTitleAscii} from './titleArt.js';

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
  revealCount?: number;
  aiSimulationProgress?: AiSimulationProgress;
  aiSimulationSpinnerFrame?: string;
}

function renderRichTextBlock(content: string, size: Slide['size']): string {
  const spacing = size === 'normal' ? '\n' : '\n\n';
  const bodyWithParagraphs = renderParagraphBlocks(content.trimEnd());

  return renderInlineColors(bodyWithParagraphs.split('\n').join(spacing));
}

function renderQuestionSection(options: RenderSlideOptions): string {
  const {
    slide,
    answer,
    questionInput = '',
    aiSimulationProgress,
    aiSimulationSpinnerFrame
  } = options;
  const value = answer?.answer ?? questionInput;

  if (!slide.aiSimulation) {
    return `Answer: ${value}`;
  }

  const sections = [`> ${value}`];

  if (!answer) {
    return sections.join('\n');
  }

  const emittedSteps = slide.aiSimulation.steps
    .slice(0, aiSimulationProgress?.emittedStepCount ?? 0)
    .map((step) => renderRichTextBlock(step.content, slide.size));

  if (emittedSteps.length > 0) {
    sections.push(emittedSteps.join('\n'));
  }

  if (aiSimulationProgress?.isComplete) {
    if (slide.aiSimulation.finalContent) {
      sections.push(renderRichTextBlock(slide.aiSimulation.finalContent, slide.size));
    }
  } else if (aiSimulationSpinnerFrame) {
    sections.push(`${aiSimulationSpinnerFrame} Thinking...`);
  }

  return sections.join('\n\n').replace(/\n+$/u, '');
}

export function renderSlideTextContent(options: RenderSlideOptions): string {
  const {slide, mediaError, revealCount = 0} = options;
  const sections: string[] = [];
  let hasBodySection = false;

  if (slide.titleText) {
    sections.push(renderTitleAscii(slide.titleText, slide.size));
  }

  if (slide.body.trim().length > 0) {
    const revealedBody = applyRevealLines(slide.body.trimEnd(), revealCount);
    sections.push(renderRichTextBlock(revealedBody, slide.size));
    hasBodySection = true;
  }

  if (slide.hasQuestion) {
    const questionSection = renderQuestionSection(options);

    if (hasBodySection && sections.length > 0) {
      sections[sections.length - 1] = `${sections.at(-1)}\n${questionSection}`;
    } else {
      sections.push(questionSection);
    }
  }

  if (mediaError) {
    sections.push(mediaError);
  }

  if (slide.beautify) {
    const decoration = renderBeautifyBands(slide.size);
    sections.unshift(decoration.top);
    sections.push(decoration.bottom);
  }

  return sections.join('\n\n').replace(/\n+$/u, '');
}

export function renderSlideHeader(slide: Slide): string | undefined {
  if (!slide.headerText?.trim()) {
    return undefined;
  }

  return renderHeaderAscii(slide.headerText, slide.headerColor);
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
