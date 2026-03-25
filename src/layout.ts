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

export function centerTextBlock(content: string, options: RenderOptions): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const hintLine = options.hintLine ?? '';
  const reservedHintRows = hintLine ? 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows, 1);
  const rawLines = content.split('\n');
  const croppedLines = rawLines.map((line) => cropLine(line, columns));
  const visibleLines = croppedLines.slice(0, usableRows);
  const topPad = Math.max(Math.floor((usableRows - visibleLines.length) / 2), 0);
  const centeredLines = visibleLines.map((line) => {
    const leftPad = Math.max(Math.floor((columns - visibleWidth(line)) / 2), 0);
    return `${' '.repeat(leftPad)}${line}`;
  });

  const frameLines: string[] = [
    ...Array.from({length: topPad}, () => ''),
    ...centeredLines
  ];

  while (frameLines.length < usableRows) {
    frameLines.push('');
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
  const frameLines: string[] = [];

  for (let row = 0; row < usableRows; row += 1) {
    const imageLine = imageLines[row - imageTop] ?? '';
    const imagePad = Math.max(imageWidth - visibleWidth(imageLine), 0);
    const textLine = textLines[row - textTop] ?? '';
    const textLeft = Math.max(Math.floor((rightPaneWidth - visibleWidth(textLine)) / 2), 0);

    frameLines.push(
      `${' '.repeat(leftMargin)}${imageLine}${' '.repeat(imagePad)}${' '.repeat(gap)}${' '.repeat(textLeft)}${textLine}`
    );
  }

  if (hintLine) {
    frameLines.push(cropLine(hintLine, columns));
  }

  return frameLines.join('\n');
}
