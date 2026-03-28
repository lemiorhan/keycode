import type {NamedColor, SlideSize} from './types.js';
import stringWidth from 'string-width';
import {renderInlineColors, stripColorTags} from './colorText.js';

const HEADER_BLOCK_PATTERN = /<header\b([^>]*)>\s*([\s\S]*?)\s*<\/header>/i;
const TITLE_BLOCK_PATTERN = /<title>\s*([\s\S]*?)\s*<\/title>/i;

export function extractHeaderBlock(content: string): {
  body: string;
  headerText?: string;
  headerColor?: NamedColor;
} {
  const match = content.match(HEADER_BLOCK_PATTERN);

  if (!match) {
    return {
      body: content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').trimEnd()
    };
  }

  const attributesText = match[1] ?? '';
  const colorMatch = attributesText.match(
    /\bcolor=(?:"|')?(red|green|yellow|blue|magenta|cyan|white|gray)(?:"|')?/i
  );
  const headerText = match[2].trim();
  const body = content
    .replace(HEADER_BLOCK_PATTERN, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trimEnd();

  return {
    body,
    headerText,
    headerColor: colorMatch?.[1]?.toLowerCase() as NamedColor | undefined
  };
}

export function extractTitleBlock(content: string): {body: string; titleText?: string} {
  const match = content.match(TITLE_BLOCK_PATTERN);

  if (!match) {
    return {
      body: content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').trimEnd()
    };
  }

  const titleText = match[1].trim();
  const body = content
    .replace(TITLE_BLOCK_PATTERN, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trimEnd();

  return {body, titleText};
}

function titleBoxMetrics(size: SlideSize): {paddingX: number; paddingY: number; outerMargin: number} {
  switch (size) {
    case 'xlarge':
      return {paddingX: 6, paddingY: 2, outerMargin: 1};
    case 'large':
      return {paddingX: 4, paddingY: 1, outerMargin: 1};
    default:
      return {paddingX: 3, paddingY: 1, outerMargin: 0};
  }
}

function centerRow(row: string, width: number): string {
  const visible = stringWidth(stripColorTags(row));
  const extra = Math.max(width - visible, 0);
  const left = Math.floor(extra / 2);
  const right = extra - left;
  return `${' '.repeat(left)}${row}${' '.repeat(right)}`;
}

export function renderTitleAscii(titleText: string, size: SlideSize = 'normal'): string {
  const lines = titleText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const {paddingX, paddingY, outerMargin} = titleBoxMetrics(size);
  const contentWidth = Math.max(...lines.map((line) => stringWidth(stripColorTags(line))), 0);
  const totalInnerWidth = contentWidth + paddingX * 2;
  const top = `┌${'─'.repeat(totalInnerWidth)}┐`;
  const empty = `│${' '.repeat(totalInnerWidth)}│`;
  const content = lines.map((line) => `│${' '.repeat(paddingX)}${centerRow(line, contentWidth)}${' '.repeat(paddingX)}│`);
  const bottom = `└${'─'.repeat(totalInnerWidth)}┘`;
  const box = [
    ...Array.from({length: outerMargin}, () => ''),
    top,
    ...Array.from({length: paddingY}, () => empty),
    ...content,
    ...Array.from({length: paddingY}, () => empty),
    bottom,
    ...Array.from({length: outerMargin}, () => '')
  ];

  return renderInlineColors(box.join('\n').replace(/\n+$/g, ''));
}

export function renderHeaderAscii(headerText: string, headerColor?: NamedColor): string {
  const lines = headerText
    .split('\n')
    .map((line) => line.trim().toUpperCase())
    .filter((line) => line.length > 0);

  return lines
    .map((line) => {
      const visibleWidth = stringWidth(stripColorTags(line));
      const ornamentWidth = Math.max(visibleWidth + 4, 12);
      const sideWidth = Math.max(Math.floor((ornamentWidth - visibleWidth) / 2), 3);
      const left = `.=~${'~'.repeat(Math.max(sideWidth - 3, 0))}`;
      const right = `${'~'.repeat(Math.max(ornamentWidth - visibleWidth - sideWidth, 0))}~=.`;
      const styledLine = headerColor ? `<color fg="${headerColor}">${line}</color>` : line;
      return renderInlineColors(`${left} ${styledLine} ${right}`);
    })
    .join('\n');
}
