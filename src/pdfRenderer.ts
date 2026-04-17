import {existsSync} from 'node:fs';
import stringWidth from 'string-width';

export interface AnsiSegment {
  text: string;
  color: string;
}

const ANSI_ESCAPE = /\x1B\[([0-9;]*)m/g;

const ANSI_TO_HEX: Record<string, string> = {
  '31': '#ff5f56',
  '32': '#5af78e',
  '33': '#f3f99d',
  '34': '#57c7ff',
  '35': '#ff6ac1',
  '36': '#9aedfe',
  '37': '#f1f1f0',
  '39': '#f1f1f0',
  '90': '#686868'
};

const DEFAULT_TEXT_COLOR = '#f1f1f0';
const PAGE_BACKGROUND = '#1e1e1e';

export const PAGE_WIDTH = 1920;
export const PAGE_HEIGHT = 1080;
const MIN_MARGIN = 40;
const LINE_HEIGHT_RATIO = 1.35;
const REFERENCE_FONT_SIZE = 100;

const DEFAULT_FONT_CANDIDATES = [
  '/System/Library/Fonts/Supplemental/Courier New.ttf',
  '/System/Library/Fonts/Menlo.ttc'
];

export function parseAnsiSegments(line: string): AnsiSegment[] {
  const segments: AnsiSegment[] = [];
  let currentColor = DEFAULT_TEXT_COLOR;
  let lastIndex = 0;

  ANSI_ESCAPE.lastIndex = 0;
  let match = ANSI_ESCAPE.exec(line);

  while (match !== null) {
    if (match.index > lastIndex) {
      const text = line.slice(lastIndex, match.index);
      if (text.length > 0) {
        segments.push({text, color: currentColor});
      }
    }

    const code = match[1];
    const codes = code.split(';');

    for (const c of codes) {
      if (ANSI_TO_HEX[c]) {
        currentColor = ANSI_TO_HEX[c];
      } else if (c === '0') {
        currentColor = DEFAULT_TEXT_COLOR;
      }
    }

    lastIndex = match.index + match[0].length;
    match = ANSI_ESCAPE.exec(line);
  }

  if (lastIndex < line.length) {
    const text = line.slice(lastIndex);
    if (text.length > 0) {
      segments.push({text, color: currentColor});
    }
  }

  return segments;
}

export interface GridGeometry {
  fontSize: number;
  cellWidth: number;
  cellHeight: number;
  gridWidth: number;
  gridHeight: number;
  marginLeft: number;
  marginTop: number;
}

function measureCharWidthRatio(doc: PDFKit.PDFDocument, fontName: string): number {
  doc.font(fontName).fontSize(REFERENCE_FONT_SIZE);
  return doc.widthOfString('M') / REFERENCE_FONT_SIZE;
}

export function computeGridGeometry(
  rows: number,
  columns: number,
  zoom: number,
  charWidthRatio: number,
  pageWidth: number = PAGE_WIDTH,
  pageHeight: number = PAGE_HEIGHT
): GridGeometry {
  const fontSizeFromWidth = (pageWidth - 2 * MIN_MARGIN) / (columns * charWidthRatio);
  const fontSizeFromHeight = (pageHeight - 2 * MIN_MARGIN) / (rows * LINE_HEIGHT_RATIO);
  const baseFontSize = Math.min(fontSizeFromWidth, fontSizeFromHeight);
  const fontSize = baseFontSize * zoom;
  const cellWidth = fontSize * charWidthRatio;
  const cellHeight = fontSize * LINE_HEIGHT_RATIO;
  const gridWidth = columns * cellWidth;
  const gridHeight = rows * cellHeight;
  const marginLeft = (pageWidth - gridWidth) / 2;
  const marginTop = (pageHeight - gridHeight) / 2;

  return {fontSize, cellWidth, cellHeight, gridWidth, gridHeight, marginLeft, marginTop};
}

export function registerFont(doc: PDFKit.PDFDocument): {fontName: string; charWidthRatio: number} {
  const envFontPath = process.env.PDF_FONT_PATH;

  if (envFontPath) {
    if (!existsSync(envFontPath)) {
      throw new Error(`PDF_FONT_PATH font not found: ${envFontPath}`);
    }

    doc.registerFont('MonoFont', envFontPath);
    const ratio = measureCharWidthRatio(doc, 'MonoFont');
    return {fontName: 'MonoFont', charWidthRatio: ratio};
  }

  for (const fontPath of DEFAULT_FONT_CANDIDATES) {
    if (existsSync(fontPath)) {
      try {
        doc.registerFont('MonoFont', fontPath);
        const ratio = measureCharWidthRatio(doc, 'MonoFont');
        return {fontName: 'MonoFont', charWidthRatio: ratio};
      } catch {
        // Try next candidate
      }
    }
  }

  const ratio = measureCharWidthRatio(doc, 'Courier');
  return {fontName: 'Courier', charWidthRatio: ratio};
}

const BOX_DRAWING_MAP: Record<string, string> = {
  '\u250C': '+',  // ┌
  '\u2500': '-',  // ─
  '\u2510': '+',  // ┐
  '\u2502': '|',  // │
  '\u2514': '+',  // └
  '\u2518': '+'   // ┘
};

const BOX_DRAWING_PATTERN = /[\u250C\u2500\u2510\u2502\u2514\u2518]/g;

function replaceBoxDrawing(text: string): string {
  return text.replace(BOX_DRAWING_PATTERN, (ch) => BOX_DRAWING_MAP[ch] ?? ch);
}

export function renderFrameToPdfPage(
  doc: PDFKit.PDFDocument,
  frame: string,
  options: {zoom: number; rows: number; columns: number; fontName: string; charWidthRatio: number; offsetX?: number; offsetY?: number}
): void {
  const {zoom, rows, columns, fontName, charWidthRatio} = options;
  const offsetX = options.offsetX ?? 0;
  const offsetY = options.offsetY ?? 0;
  const geo = computeGridGeometry(rows, columns, zoom, charWidthRatio);
  const lines = replaceBoxDrawing(frame).split('\n');

  for (let r = 0; r < lines.length && r < rows; r++) {
    const y = geo.marginTop + offsetY + r * geo.cellHeight;
    const segments = parseAnsiSegments(lines[r]);
    let colOffset = 0;

    for (const segment of segments) {
      if (segment.text.length === 0) {
        continue;
      }

      const x = geo.marginLeft + offsetX + colOffset * geo.cellWidth;

      doc
        .font(fontName)
        .fontSize(geo.fontSize)
        .fillColor(segment.color)
        .text(segment.text, x, y, {lineBreak: false});

      colOffset += stringWidth(segment.text);
    }
  }
}

export function fillPageBackground(doc: PDFKit.PDFDocument): void {
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT).fill(PAGE_BACKGROUND);
}

export interface ImagePlacement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function embedImageOnPage(
  doc: PDFKit.PDFDocument,
  imagePath: string,
  placement: ImagePlacement
): void {
  if (!existsSync(imagePath)) {
    return;
  }

  doc.image(imagePath, placement.x, placement.y, {
    fit: [placement.width, placement.height],
    align: 'center',
    valign: 'center'
  });
}
