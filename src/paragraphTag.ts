import stringWidth from 'string-width';
import {renderInlineColors, stripColorTags} from './colorText.js';
import type {SlideAlign} from './types.js';

const PARAGRAPH_TAG_PATTERN = /<p\b([^>]*)>([\s\S]*?)<\/p>/gi;
export const TOP_MARGIN_MARKER_PATTERN = /\x00TM(\d+)\x00/g;
const COLOR_TAG_TOKEN_PATTERN =
  /<color\s+fg=(?:"|')(?:red|green|yellow|blue|magenta|cyan|white|gray)(?:"|')>|<\/color>|\s+|[^\s<]+|</gi;

interface ParagraphAttributes {
  align: SlideAlign;
  maxWidth?: number;
  topMargin?: number;
}

function visibleWidth(value: string): number {
  return stringWidth(stripColorTags(value));
}

function parseAttributes(attributesText: string): ParagraphAttributes {
  const alignMatch = attributesText.match(/\balign=(?:"|')?(left|center|right)(?:"|')?/i);
  const maxWidthMatch = attributesText.match(/\bmax-width=(?:"|')?(\d+)(?:"|')?/i);
  const topMarginMatch = attributesText.match(/\btop-margin=(?:"|')?(\d+)(?:"|')?/i);

  return {
    align: (alignMatch?.[1]?.toLowerCase() as SlideAlign | undefined) ?? 'center',
    maxWidth: maxWidthMatch ? Number.parseInt(maxWidthMatch[1], 10) : undefined,
    topMargin: topMarginMatch ? Math.max(Number.parseInt(topMarginMatch[1], 10), 0) : undefined
  };
}

function tokenizeMarkup(content: string): string[] {
  const tokens = content.match(COLOR_TAG_TOKEN_PATTERN);
  return tokens ?? [];
}

function closeOpenColors(count: number): string {
  return '</color>'.repeat(Math.max(count, 0));
}

function openActiveColors(stack: string[]): string {
  return stack.join('');
}

function alignLine(lineMarkup: string, maxWidth: number, align: SlideAlign): string {
  const width = visibleWidth(lineMarkup);
  const remaining = Math.max(maxWidth - width, 0);

  if (align === 'left') {
    return `${lineMarkup}${' '.repeat(remaining)}`;
  }

  if (align === 'right') {
    return `${' '.repeat(remaining)}${lineMarkup}`;
  }

  const left = Math.floor(remaining / 2);
  const right = remaining - left;
  return `${' '.repeat(left)}${lineMarkup}${' '.repeat(right)}`;
}

function wrapParagraphMarkup(content: string, maxWidth: number, align: SlideAlign): string {
  const normalizedLines = content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim());

  while (normalizedLines[0] === '') {
    normalizedLines.shift();
  }

  while (normalizedLines.at(-1) === '') {
    normalizedLines.pop();
  }

  const wrappedLines = normalizedLines.flatMap((line) => {
    if (!line) {
      return [''];
    }

    const tokens = tokenizeMarkup(line);
  const lines: string[] = [];
  const colorStack: string[] = [];
  let current = '';
  let currentWidth = 0;
  let pendingSpace = false;

  const flushLine = (): void => {
    if (currentWidth === 0 && current.trim().length === 0) {
      return;
    }

    const closed = `${current}${closeOpenColors(colorStack.length)}`;
    lines.push(renderInlineColors(closed));
    current = openActiveColors(colorStack);
    currentWidth = 0;
    pendingSpace = false;
  };

    for (const token of tokens) {
      if (!token) {
        continue;
      }

      const isOpenColor = /^<color\b/i.test(token);
      const isCloseColor = /^<\/color>$/i.test(token);
      const isWhitespace = /^\s+$/.test(token);

      if (isOpenColor) {
        current += token;
        colorStack.push(token);
        continue;
      }

      if (isCloseColor) {
        current += token;
        colorStack.pop();
        continue;
      }

      if (isWhitespace) {
        pendingSpace = currentWidth > 0;
        continue;
      }

      const tokenWidth = visibleWidth(token);
      const spaceWidth = pendingSpace && currentWidth > 0 ? 1 : 0;

      if (currentWidth > 0 && currentWidth + spaceWidth + tokenWidth > maxWidth) {
        flushLine();
      }

      if (pendingSpace && currentWidth > 0) {
        current += ' ';
        currentWidth += 1;
      }

      current += token;
      currentWidth += tokenWidth;
      pendingSpace = false;
    }

    flushLine();

    return lines;
  });

  const longestLineWidth = Math.max(...wrappedLines.map((line) => stringWidth(line)), 0);
  const effectiveWidth = align === 'left'
    ? Math.min(maxWidth, longestLineWidth)
    : maxWidth;

  return wrappedLines
    .map((line) => alignLine(line, effectiveWidth, align))
    .join('\n');
}

export function renderParagraphBlocks(content: string): string {
  return content.replace(PARAGRAPH_TAG_PATTERN, (_, attributesText: string, innerContent: string) => {
    const attributes = parseAttributes(attributesText);
    const maxWidth = Math.max(attributes.maxWidth ?? 80, 1);
    const rendered = wrapParagraphMarkup(innerContent, maxWidth, attributes.align);
    if (attributes.topMargin && attributes.topMargin > 0) {
      return `\x00TM${attributes.topMargin}\x00${rendered}`;
    }
    return rendered;
  });
}

export function expandTopMarginMarkers(content: string): string {
  return content.replace(TOP_MARGIN_MARKER_PATTERN, (_, count: string) =>
    '\n'.repeat(Number(count))
  );
}
