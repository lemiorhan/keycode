import stringWidth from 'string-width';
import type {SlideAlign, SlideScreen} from './types.js';

export interface RenderOptions {
  rows: number;
  columns: number;
  hintLine?: string;
  topOverlayLine?: string;
  topOverlayAlign?: SlideAlign;
  bottomOverlayLine?: string;
  bottomOverlayAlign?: SlideAlign;
  align?: SlideAlign;
  preferCompactLeftPane?: boolean;
  headerContent?: string;
  footerContent?: string;
  forcePerLineCenter?: boolean;
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
  let index = 0;

  while (index < line.length) {
    const ansiMatch = line.slice(index).match(/^\x1B\[[0-9;]*m/);

    if (ansiMatch) {
      output += ansiMatch[0];
      index += ansiMatch[0].length;
      continue;
    }

    const char = line[index] ?? '';
    const charWidth = stringWidth(char);

    if (width + charWidth > columns) {
      break;
    }

    output += char;
    width += charWidth;
    index += 1;
  }

  return output;
}

function shouldCenterAsBlock(lines: string[]): boolean {
  return lines.some((line) => line.trimStart().startsWith('* ')) || hasPreAlignedPadding(lines);
}

function hasPreAlignedPadding(lines: string[]): boolean {
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
  const trailingPaddedCount = nonEmptyLines.filter((line) => line !== line.trimEnd()).length;

  return trailingPaddedCount >= 1;
}

function preAlignedReferenceWidth(lines: string[]): number {
  const referenceLines = lines.filter((line) => {
    if (line.trim().length === 0) {
      return false;
    }

    const trimmedStart = line.trimStart();
    return line !== line.trimEnd() || (line !== trimmedStart && !trimmedStart.startsWith('* '));
  });

  const source = referenceLines.length > 0 ? referenceLines : lines;
  return Math.max(...source.map((line) => visibleWidth(line)), 0);
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

function centerLines(lines: string[], rows: number, columns: number, align: SlideAlign, forcePerLineCenter = false): string[] {
  const croppedLines = lines.map((line) => cropLine(line, columns));
  const visibleLines = croppedLines.slice(0, rows);
  const sourceVisibleLines = lines.slice(0, rows);
  const topPad = Math.max(Math.floor((rows - visibleLines.length) / 2), 0);
  const paddedBlock = hasPreAlignedPadding(sourceVisibleLines);
  const useBlockAlignment = !forcePerLineCenter && (align !== 'center' || shouldCenterAsBlock(visibleLines));
  const blockWidth = useBlockAlignment
    ? paddedBlock
      ? Math.min(preAlignedReferenceWidth(sourceVisibleLines), columns)
      : Math.max(...visibleLines.map((line) => visibleWidth(line)), 0)
    : 0;
  const centeredLines = visibleLines.map((line) => {
    const lineWidth = visibleWidth(line);
    const targetWidth = useBlockAlignment ? blockWidth : lineWidth;
    const outerLeftPad = Math.max(Math.floor((columns - targetWidth) / 2), 0);
    const innerLeftPad =
      useBlockAlignment && !paddedBlock ? linePad(targetWidth, lineWidth, align) : 0;
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

function centerHeaderLines(headerContent: string, columns: number): string[] {
  return headerContent
    .split('\n')
    .map((line) => cropLine(line, columns))
    .map((line) => `${' '.repeat(Math.max(Math.floor((columns - visibleWidth(line)) / 2), 0))}${line}`);
}

function alignOverlayLine(line: string, columns: number, align: SlideAlign): string {
  const croppedLine = cropLine(line, columns);
  const padding =
    align === 'left'
      ? 0
      : align === 'right'
        ? Math.max(columns - visibleWidth(croppedLine), 0)
        : Math.max(Math.floor((columns - visibleWidth(croppedLine)) / 2), 0);

  return `${' '.repeat(padding)}${croppedLine}`;
}

function centerPreservedBlock(lines: string[], columns: number): string[] {
  const croppedLines = lines.map((line) => cropLine(line, columns));
  const blockWidth = Math.max(...croppedLines.map((line) => visibleWidth(line)), 0);
  const outerLeftPad = Math.max(Math.floor((columns - blockWidth) / 2), 0);
  return croppedLines.map((line) => `${' '.repeat(outerLeftPad)}${line}`);
}

export function centerTextBlock(content: string, options: RenderOptions): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const hintLine = options.hintLine ?? '';
  const topOverlayLine = options.topOverlayLine
    ? alignOverlayLine(options.topOverlayLine, columns, options.topOverlayAlign ?? 'right')
    : '';
  const bottomOverlayLine = options.bottomOverlayLine
    ? alignOverlayLine(options.bottomOverlayLine, columns, options.bottomOverlayAlign ?? 'right')
    : '';
  const align = options.align ?? 'center';
  const headerContent = options.headerContent ?? '';
  const footerContent = options.footerContent ?? '';
  const reservedHintRows = hintLine ? 1 : 0;
  const reservedTopOverlayRows = topOverlayLine ? 1 : 0;
  const reservedBottomOverlayRows = bottomOverlayLine ? 1 : 0;
  const headerLines = headerContent ? centerHeaderLines(headerContent, columns) : [];
  const reservedHeaderRows = headerLines.length > 0 ? headerLines.length + 2 : 0;
  const footerLines = footerContent ? footerContent.split('\n').map((line) => cropLine(line, columns)) : [];
  const reservedFooterRows = footerLines.length > 0 ? footerLines.length + 1 : 0;
  const usableRows = Math.max(
    rows -
      reservedHintRows -
      reservedTopOverlayRows -
      reservedBottomOverlayRows -
      reservedHeaderRows -
      reservedFooterRows,
    1
  );
  const rawLines = content.split('\n');
  const frameLines = [
    ...(topOverlayLine ? [topOverlayLine] : []),
    ...(headerLines.length > 0 ? [''] : []),
    ...headerLines,
    ...(headerLines.length > 0 ? [''] : []),
    ...centerLines(rawLines, usableRows, columns, align, options.forcePerLineCenter)
  ];

  if (footerLines.length > 0) {
    frameLines.push('');
    frameLines.push(...footerLines);
  }

  if (bottomOverlayLine) {
    frameLines.push(bottomOverlayLine);
  }

  if (hintLine) {
    frameLines.push(cropLine(hintLine, columns));
  }

  return frameLines.join('\n');
}

export function centerStackedSections(
  sections: string[],
  options: RenderOptions & {sectionGap?: number}
): string {
  const rows = Math.max(options.rows, 1);
  const columns = Math.max(options.columns, 1);
  const align = options.align ?? 'center';
  const headerContent = options.headerContent ?? '';
  const footerContent = options.footerContent ?? '';
  const hintLine = options.hintLine ?? '';
  const topOverlayLine = options.topOverlayLine
    ? alignOverlayLine(options.topOverlayLine, columns, options.topOverlayAlign ?? 'right')
    : '';
  const bottomOverlayLine = options.bottomOverlayLine
    ? alignOverlayLine(options.bottomOverlayLine, columns, options.bottomOverlayAlign ?? 'right')
    : '';
  const sectionGap = Math.max(options.sectionGap ?? 1, 0);
  const headerLines = headerContent ? centerHeaderLines(headerContent, columns) : [];
  const reservedHeaderRows = headerLines.length > 0 ? headerLines.length + 2 : 0;
  const footerLines = footerContent ? footerContent.split('\n').map((line) => cropLine(line, columns)) : [];
  const reservedFooterRows = footerLines.length > 0 ? footerLines.length + 1 : 0;
  const reservedHintRows = hintLine ? 1 : 0;
  const reservedTopOverlayRows = topOverlayLine ? 1 : 0;
  const reservedBottomOverlayRows = bottomOverlayLine ? 1 : 0;
  const usableRows = Math.max(
    rows -
      reservedHeaderRows -
      reservedFooterRows -
      reservedHintRows -
      reservedTopOverlayRows -
      reservedBottomOverlayRows,
    1
  );
  const normalizedSections = sections
    .map((section) => section.trim().length > 0 ? section.replace(/\n+$/u, '') : '')
    .filter((section) => section.length > 0);

  const bodyLines: string[] = [];

  normalizedSections.forEach((section, index) => {
    if (index > 0) {
      bodyLines.push(...Array.from({length: sectionGap}, () => ''));
    }

    const lines = section.split('\n');
    const centeredLines = index === 0
      ? centerPreservedBlock(lines, columns)
      : centerLines(lines, lines.length, columns, align);

    bodyLines.push(...centeredLines);
  });

  const visibleBodyLines = bodyLines.slice(0, usableRows);
  const topPad = Math.max(Math.floor((usableRows - visibleBodyLines.length) / 2), 0);
  const frameLines: string[] = [
    ...(topOverlayLine ? [topOverlayLine] : []),
    ...(headerLines.length > 0 ? [''] : []),
    ...headerLines,
    ...(headerLines.length > 0 ? [''] : []),
    ...Array.from({length: topPad}, () => ''),
    ...visibleBodyLines
  ];

  while (frameLines.length < rows - reservedFooterRows - reservedBottomOverlayRows - reservedHintRows) {
    frameLines.push('');
  }

  if (footerLines.length > 0) {
    frameLines.push('');
    frameLines.push(...footerLines);
  }

  if (bottomOverlayLine) {
    frameLines.push(bottomOverlayLine);
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
  const topOverlayLine = options.topOverlayLine
    ? alignOverlayLine(options.topOverlayLine, columns, options.topOverlayAlign ?? 'right')
    : '';
  const bottomOverlayLine = options.bottomOverlayLine
    ? alignOverlayLine(options.bottomOverlayLine, columns, options.bottomOverlayAlign ?? 'right')
    : '';
  const align = options.align ?? 'center';
  const preferCompactLeftPane = options.preferCompactLeftPane ?? false;
  const reservedHintRows = hintLine ? 1 : 0;
  const reservedTopOverlayRows = topOverlayLine ? 1 : 0;
  const reservedBottomOverlayRows = bottomOverlayLine ? 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows - reservedTopOverlayRows - reservedBottomOverlayRows, 1);
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
  const frameLines: string[] = [...(topOverlayLine ? [topOverlayLine] : [])];

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

  if (bottomOverlayLine) {
    frameLines.push(bottomOverlayLine);
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
  const topOverlayLine = options.topOverlayLine
    ? alignOverlayLine(options.topOverlayLine, columns, options.topOverlayAlign ?? 'right')
    : '';
  const bottomOverlayLine = options.bottomOverlayLine
    ? alignOverlayLine(options.bottomOverlayLine, columns, options.bottomOverlayAlign ?? 'right')
    : '';
  const reservedHintRows = hintLine ? 1 : 0;
  const reservedTopOverlayRows = topOverlayLine ? 1 : 0;
  const reservedBottomOverlayRows = bottomOverlayLine ? 1 : 0;
  const usableRows = Math.max(rows - reservedHintRows - reservedTopOverlayRows - reservedBottomOverlayRows, 1);
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
  const frameLines: string[] = [...(topOverlayLine ? [topOverlayLine] : [])];

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

  if (bottomOverlayLine) {
    frameLines.push(bottomOverlayLine);
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
  const hintLine = options.hintLine ?? '';
  const topOverlayLine = options.topOverlayLine
    ? alignOverlayLine(options.topOverlayLine, columns, options.topOverlayAlign ?? 'right')
    : '';
  const bottomOverlayLine = options.bottomOverlayLine
    ? alignOverlayLine(options.bottomOverlayLine, columns, options.bottomOverlayAlign ?? 'right')
    : '';
  const reservedHintRows = hintLine ? 1 : 0;
  const headerContent = options.headerContent ?? '';
  const headerLines = headerContent ? centerHeaderLines(headerContent, columns) : [];
  const reservedHeaderRows = headerLines.length > 0 ? headerLines.length + 2 : 0;
  const footerContent = options.footerContent ?? '';
  const footerLines = footerContent ? footerContent.split('\n').map((line) => cropLine(line, columns)) : [];
  const reservedFooterRows = footerLines.length > 0 ? footerLines.length + 1 : 0;
  const reservedTopOverlayRows = topOverlayLine ? 1 : 0;
  const reservedBottomOverlayRows = bottomOverlayLine ? 1 : 0;
  const usableRows = Math.max(
    rows -
      reservedHeaderRows -
      reservedFooterRows -
      reservedHintRows -
      reservedTopOverlayRows -
      reservedBottomOverlayRows,
    1
  );
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
  const frameLines: string[] = [
    ...(topOverlayLine ? [topOverlayLine] : []),
    ...(headerLines.length > 0 ? [''] : []),
    ...headerLines,
    ...(headerLines.length > 0 ? [''] : [])
  ];

  for (let row = 0; row < usableRows; row += 1) {
    const leftSegment = (leftContentLines[row] ?? '').padEnd(leftPaneWidth, ' ');
    const rightSegment = (rightContentLines[row] ?? '').padEnd(rightPaneWidth, ' ');

    frameLines.push(`${leftSegment}${rightSegment}`.replace(/\s+$/g, ''));
  }

  if (footerLines.length > 0) {
    frameLines.push('');
    frameLines.push(...footerLines);
  }

  if (bottomOverlayLine) {
    frameLines.push(bottomOverlayLine);
  }

  if (hintLine) {
    frameLines.push(cropLine(hintLine, columns));
  }

  return frameLines.join('\n');
}
