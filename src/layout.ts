import stringWidth from 'string-width';
import type {SlideAlign, SlideScreen} from './types.js';

export interface RenderOptions {
  rows: number;
  columns: number;
  hintLine?: string;
  align?: SlideAlign;
  preferCompactLeftPane?: boolean;
  footerContent?: string;
}

const ANSI_PATTERN = /\x1B\[[0-9;]*m/g;

function visibleWidth(line: string): number {
  return stringWidth(line.replace(ANSI_PATTERN, ''));
}

function cropLine(line: string, columns: number): string {
  if (visibleWidth(line) <= columns) {
    return line;
  }

  let width = 0;
  let output = '';

  for (const char of line) {
    const charWidth = stringWidth(char);

    if (width + charWidth > columns) {
      break;
    }

    output += char;
    width += charWidth;
  }

  return output;
}

function shouldCenterAsBlock(lines: string[]): boolean {
  return lines.some((line) => line.trimStart().startsWith('* '));
}

function linePad(targetWidth: number, lineWidth: number, align: SlideAlign): number {
  if (align === 'right') {
    return Math.max(targetWidth - lineWidth, 0);
  }

  if (align === 'left') {
    return 0;
  }

  return Math.max(Math.floor((targetWidth - lineWidth) / 2), 0);
}

function centerLines(lines: string[], rows: number, columns: number, align: SlideAlign): string[] {
  const croppedLines = lines.map((line) => cropLine(line, columns));
  const visibleLines = croppedLines.slice(0, rows);
  const topPad = Math.max(Math.floor((rows - visibleLines.length) / 2), 0);
  const useBlockAlignment = align !== 'center' || shouldCenterAsBlock(visibleLines);
  const blockWidth = useBlockAlignment
    ? Math.max(...visibleLines.map((line) => visibleWidth(line)), 0)
    : 0;
  const centeredLines = visibleLines.map((line) => {
    const lineWidth = visibleWidth(line);
    const targetWidth = useBlockAlignment ? blockWidth : lineWidth;
    const outerLeftPad = Math.max(Math.floor((columns - targetWidth) / 2), 0);
    const innerLeftPad = useBlockAlignment ? linePad(targetWidth, lineWidth, align) : 0;
    return `${' '.repeat(outerLeftPad + innerLeftPad)}${line}`;
  });

  const frameLines: string[] = [
    ...Array.from({length: topPad}, () => ''),
    ...centeredLines
  ];

  while (frameLines.length < rows) {
    frameLines.push('');
  }

  return frameLines;
}

function alignLinesInPane(lines: string[], rows: number, paneWidth: number, align: SlideAlign): string[] {
  const innerPadding = 2;
  const contentWidth = Math.max(paneWidth - innerPadding * 2, 1);
  const croppedLines = lines.map((line) => cropLine(line, contentWidth));
  const visibleLines = croppedLines.slice(0, rows);
  const topPad = Math.max(Math.floor((rows - visibleLines.length) / 2), 0);
  const blockWidth = Math.max(...visibleLines.map((line) => visibleWidth(line)), 0);
  const alignedLines = visibleLines.map((line) => {
    const available = Math.max(contentWidth - blockWidth, 0);
    const offset =
      align === 'left' ? 0 : align === 'right' ? available : Math.floor(available / 2);
    return `${' '.repeat(innerPadding + offset)}${line}`;
  });

  const frameLines: string[] = [
    ...Array.from({length: topPad}, () => ''),
    ...alignedLines
  ];

  while (frameLines.length < rows) {
    frameLines.push('');
  }

  return frameLines;
}

export function centerTextBlock(content: string, options: RenderOptions): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const hintLine = options.hintLine ?? '';
  const align = options.align ?? 'center';
  const footerContent = options.footerContent ?? '';
  const reservedHintRows = hintLine ? 1 : 0;
  const footerLines = footerContent ? footerContent.split('\n').map((line) => cropLine(line, columns)) : [];
  const reservedFooterRows = footerLines.length > 0 ? footerLines.length + 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows - reservedFooterRows, 1);
  const rawLines = content.split('\n');
  const frameLines = centerLines(rawLines, usableRows, columns, align);

  if (footerLines.length > 0) {
    frameLines.push('');
    frameLines.push(...footerLines);
  }

  if (hintLine) {
    frameLines.push(cropLine(hintLine, columns));
  }

  return frameLines.join('\n');
}

export function composeBottomRightOverlayLayout(
  textContent: string,
  overlayContent: string,
  options: RenderOptions
): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const hintLine = options.hintLine ?? '';
  const align = options.align ?? 'center';
  const preferCompactLeftPane = options.preferCompactLeftPane ?? false;
  const reservedHintRows = hintLine ? 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows, 1);
  const textLines = textContent.split('\n');
  const overlayLines = overlayContent.split('\n');
  const overlayWidth = Math.max(...overlayLines.map((line) => visibleWidth(line)), 0);
  const overlayHeight = overlayLines.length;
  const rightMargin = 2;
  const bottomMargin = 1;
  const gap = preferCompactLeftPane ? 2 : 4;
  const leftPaneWidth = Math.max(columns - overlayWidth - gap - rightMargin, 1);
  const centeredTextLines = centerLines(textLines, usableRows, leftPaneWidth, align);
  const overlayLeft = Math.max(columns - rightMargin - overlayWidth, 0);
  const overlayTop = Math.max(usableRows - bottomMargin - overlayHeight, 0);
  const frameLines: string[] = [];

  for (let row = 0; row < usableRows; row += 1) {
    const baseLine = centeredTextLines[row] ?? '';
    const rowChars = baseLine.padEnd(columns, ' ').split('');
    const overlayLine = overlayLines[row - overlayTop];

    if (overlayLine !== undefined) {
      const paddedOverlay = overlayLine.padEnd(overlayWidth, ' ');

      for (
        let column = 0;
        column < paddedOverlay.length && overlayLeft + column < rowChars.length;
        column += 1
      ) {
        rowChars[overlayLeft + column] = paddedOverlay[column] ?? ' ';
      }
    }

    frameLines.push(rowChars.join('').replace(/\s+$/g, ''));
  }

  if (hintLine) {
    frameLines.push(cropLine(hintLine, columns));
  }

  return frameLines.join('\n');
}

export function composeImageLeftLayout(
  imageAscii: string,
  textContent: string,
  options: RenderOptions
): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const hintLine = options.hintLine ?? '';
  const reservedHintRows = hintLine ? 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows, 1);
  const imageLines = imageAscii.split('\n');
  const textLines = textContent.split('\n');
  const imageWidth = Math.max(...imageLines.map((line) => visibleWidth(line)), 0);
  const leftMargin = 2;
  const gap = 4;
  const rightPaneWidth = Math.max(columns - leftMargin - imageWidth - gap, 12);
  const imageTop = Math.max(Math.floor((usableRows - imageLines.length) / 2), 0);
  const textTop = Math.max(Math.floor((usableRows - textLines.length) / 2), 0);
  const centerTextAsBlock = shouldCenterAsBlock(textLines);
  const textBlockWidth = centerTextAsBlock
    ? Math.max(...textLines.map((line) => visibleWidth(line)), 0)
    : 0;
  const frameLines: string[] = [];

  for (let row = 0; row < usableRows; row += 1) {
    const imageLine = imageLines[row - imageTop] ?? '';
    const imagePad = Math.max(imageWidth - visibleWidth(imageLine), 0);
    const textLine = textLines[row - textTop] ?? '';
    const targetWidth = centerTextAsBlock ? textBlockWidth : visibleWidth(textLine);
    const textLeft = Math.max(Math.floor((rightPaneWidth - targetWidth) / 2), 0);

    frameLines.push(
      `${' '.repeat(leftMargin)}${imageLine}${' '.repeat(imagePad)}${' '.repeat(gap)}${' '.repeat(textLeft)}${textLine}`
    );
  }

  if (hintLine) {
    frameLines.push(cropLine(hintLine, columns));
  }

  return frameLines.join('\n');
}

export function composeTwoScreenLayout(
  leftContent: string,
  rightContent: string,
  options: RenderOptions & {screens: [SlideScreen, SlideScreen]}
): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const footerContent = options.footerContent ?? '';
  const footerLines = footerContent ? footerContent.split('\n').map((line) => cropLine(line, columns)) : [];
  const reservedFooterRows = footerLines.length > 0 ? footerLines.length + 1 : 0;
  const usableRows = Math.max(rows - reservedFooterRows, 1);
  const [leftScreen, rightScreen] = options.screens;
  const leftPaneWidth = Math.max(Math.floor(columns * (leftScreen.widthPercent / 100)), 1);
  const rightPaneWidth = Math.max(columns - leftPaneWidth, 1);
  const leftContentLines = alignLinesInPane(
    leftContent.split('\n'),
    usableRows,
    leftPaneWidth,
    leftScreen.contentAlign
  );
  const rightContentLines = alignLinesInPane(
    rightContent.split('\n'),
    usableRows,
    rightPaneWidth,
    rightScreen.contentAlign
  );
  const frameLines: string[] = [];

  for (let row = 0; row < usableRows; row += 1) {
    const leftSegment = (leftContentLines[row] ?? '').padEnd(leftPaneWidth, ' ');
    const rightSegment = (rightContentLines[row] ?? '').padEnd(rightPaneWidth, ' ');

    frameLines.push(`${leftSegment}${rightSegment}`.replace(/\s+$/g, ''));
  }

  if (footerLines.length > 0) {
    frameLines.push('');
    frameLines.push(...footerLines);
  }

  return frameLines.join('\n');
}
