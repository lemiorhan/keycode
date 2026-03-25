import type {ParsedDeck, Slide} from './types.js';
import {extractImageSource} from './imageAscii.js';
import {extractTitleBlock} from './titleArt.js';

const SLIDE_SEPARATOR = /^---\s*$/m;
const QUESTION_TOKEN = '[QUESTION]';

function normalizeDeckSource(source: string): string {
  return source.replace(/\r\n/g, '\n');
}

function trimOuterBlankLines(value: string): string {
  return value.replace(/^\n+/, '').replace(/\n+$/, '');
}

export function parseSlides(source: string): ParsedDeck {
  const normalized = normalizeDeckSource(source);
  const rawSlides = normalized.split(SLIDE_SEPARATOR).map(trimOuterBlankLines);
  const nonEmptySlides = rawSlides.filter((slide) => slide.length > 0);

  const slides = nonEmptySlides.map((raw, index, all): Slide => {
    const hasQuestion = raw.includes(QUESTION_TOKEN);
    const withoutQuestionToken = raw
      .replace(/\n?[ \t]*\[QUESTION\][ \t]*\n?/g, '\n')
      .replaceAll(QUESTION_TOKEN, '')
      .replace(/[ \t]+\n/g, '\n');
    const titleExtraction = extractTitleBlock(withoutQuestionToken);
    const imageExtraction = extractImageSource(titleExtraction.body);
    const isAsciiArt = index === 0 || index === all.length - 1;

    return {
      index,
      raw,
      body: imageExtraction.body,
      isAsciiArt,
      hasQuestion,
      titleText: titleExtraction.titleText,
      imageSource: imageExtraction.imageSource
    };
  });

  return {slides};
}
