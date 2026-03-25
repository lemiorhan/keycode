import type {SlideSize} from './types.js';
import stringWidth from 'string-width';

const TITLE_BLOCK_PATTERN = /<title>\s*([\s\S]*?)\s*<\/title>/i;
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
  const visible = stringWidth(row);
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
  const contentWidth = Math.max(...lines.map((line) => stringWidth(line)), 0);
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

  return box.join('\n').replace(/\n+$/g, '');
}
