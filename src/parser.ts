import {extractAiSimulation} from './aiSimTag.js';
import type {ParsedDeck, Slide} from './types.js';
import {extractSlideAlign} from './alignTag.js';
import {extractAsciiArtBlock} from './asciiArtTag.js';
import {extractBeautifyTag} from './beautifyTag.js';
import {extractFootnoteBlock} from './footnoteTag.js';
import {extractImageTag} from './imageTag.js';
import {extractQrBlock} from './qrTag.js';
import {extractScreenTags} from './screenTag.js';
import {extractSlideNumberTag} from './slideNumberTag.js';
import {extractSlideSize} from './sizeTag.js';
import {extractHeaderBlock, extractTitleBlock} from './titleArt.js';

const SLIDE_SEPARATOR = /^---\s*$/m;
const QUESTION_TOKEN = '[QUESTION]';

function normalizeDeckSource(source: string): string {
  return source.replace(/\r\n/g, '\n');
}

function stripBlockComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, '');
}

function stripCommentLines(source: string): string {
  return source
    .split('\n')
    .filter((line) => !/^[ \t]*\/\//.test(line))
    .join('\n');
}

function trimOuterBlankLines(value: string): string {
  return value.replace(/^\n+/, '').replace(/\n+$/, '');
}

export function parseSlides(source: string): ParsedDeck {
  const normalized = stripCommentLines(stripBlockComments(normalizeDeckSource(source)));
  const rawSlides = normalized.split(SLIDE_SEPARATOR).map(trimOuterBlankLines);
  const nonEmptySlides = rawSlides.filter((slide) => slide.length > 0);

  const slides = nonEmptySlides.map((raw, index, all): Slide => {
    const hasQuestion = raw.includes(QUESTION_TOKEN);
    const withoutQuestionToken = raw
      .replace(/\n?[ \t]*\[QUESTION\][ \t]*\n?/g, '\n')
      .replaceAll(QUESTION_TOKEN, '')
      .replace(/<image-url>\s*[\s\S]*?\s*<\/image-url>/gi, '')
      .replace(/[ \t]+\n/g, '\n');
    const aiSimulationExtraction = extractAiSimulation(withoutQuestionToken);
    const alignExtraction = extractSlideAlign(aiSimulationExtraction.body);
    const sizeExtraction = extractSlideSize(alignExtraction.body);
    const beautifyExtraction = extractBeautifyTag(sizeExtraction.body);
    const screenExtraction = extractScreenTags(beautifyExtraction.body);
    const qrExtraction = extractQrBlock(screenExtraction.body);
    const imageExtraction = extractImageTag(qrExtraction.body);
    const asciiArtExtraction = extractAsciiArtBlock(imageExtraction.body);
    const footnoteExtraction = extractFootnoteBlock(asciiArtExtraction.body);
    const headerExtraction = extractHeaderBlock(footnoteExtraction.body);
    const slideNumberExtraction = extractSlideNumberTag(headerExtraction.body);
    const titleExtraction = extractTitleBlock(slideNumberExtraction.body);
    const isAsciiArt = index === 0 || index === all.length - 1;

    return {
      index,
      raw,
      body: titleExtraction.body,
      beautify: beautifyExtraction.beautify,
      footnote: footnoteExtraction.footnote,
      asciiArt: asciiArtExtraction.asciiArt,
      screens: screenExtraction.screens,
      isAsciiArt,
      hasQuestion,
      aiSimulation: aiSimulationExtraction.aiSimulation,
      headerText: headerExtraction.headerText,
      headerColor: headerExtraction.headerColor,
      slideNumber: slideNumberExtraction.slideNumber,
      titleText: titleExtraction.titleText,
      qrText: qrExtraction.qrText,
      qrWidthPercent: qrExtraction.qrWidthPercent,
      qrColors: qrExtraction.qrColors,
      imagePath: imageExtraction.imagePath,
      imageWidthPercent: imageExtraction.imageWidthPercent,
      imageBackgroundColor: imageExtraction.imageBackgroundColor,
      align: alignExtraction.align,
      size: sizeExtraction.size
    };
  });

  return {slides};
}
