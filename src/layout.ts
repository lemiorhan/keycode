import stringWidth from 'string-width';

export interface RenderOptions {
  rows: number;
  columns: number;
  hintLine?: string;
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

function centerLines(lines: string[], rows: number, columns: number): string[] {
  const croppedLines = lines.map((line) => cropLine(line, columns));
  const visibleLines = croppedLines.slice(0, rows);
  const topPad = Math.max(Math.floor((rows - visibleLines.length) / 2), 0);
  const centerAsBlock = shouldCenterAsBlock(visibleLines);
  const blockWidth = centerAsBlock
    ? Math.max(...visibleLines.map((line) => visibleWidth(line)), 0)
    : 0;
  const centeredLines = visibleLines.map((line) => {
    const targetWidth = centerAsBlock ? blockWidth : visibleWidth(line);
    const leftPad = Math.max(Math.floor((columns - targetWidth) / 2), 0);
    return `${' '.repeat(leftPad)}${line}`;
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

export function centerTextBlock(content: string, options: RenderOptions): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const hintLine = options.hintLine ?? '';
  const reservedHintRows = hintLine ? 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows, 1);
  const rawLines = content.split('\n');
  const frameLines = centerLines(rawLines, usableRows, columns);

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
  const reservedHintRows = hintLine ? 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows, 1);
  const textLines = textContent.split('\n');
  const overlayLines = overlayContent.split('\n');
  const overlayWidth = Math.max(...overlayLines.map((line) => visibleWidth(line)), 0);
  const overlayHeight = overlayLines.length;
  const rightMargin = 2;
  const bottomMargin = 1;
  const gap = 4;
  const leftPaneWidth = Math.max(columns - overlayWidth - gap - rightMargin, 1);
  const centeredTextLines = centerLines(textLines, usableRows, leftPaneWidth);
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
