import {basename} from 'node:path';
import {readFile} from 'node:fs/promises';

const SLIDE_SEPARATOR = /^---\s*$/m;
const SLIDE_SEPARATOR_LINE = /^---\s*$/;

interface CursorInfo {
  filename: string;
  line: number;
}

export function parseCursorFile(content: string): CursorInfo | undefined {
  const trimmed = content.trim();

  if (trimmed.length === 0) {
    return undefined;
  }

  const colonIndex = trimmed.indexOf(':');

  if (colonIndex === -1) {
    return undefined;
  }

  const filename = trimmed.slice(0, colonIndex).trim();
  const lineStr = trimmed.slice(colonIndex + 1).trim();

  if (!filename.endsWith('.sld')) {
    return undefined;
  }

  const line = Number.parseInt(lineStr, 10);

  if (!Number.isFinite(line) || line < 1) {
    return undefined;
  }

  return {filename, line};
}

export function countSlidesInContent(content: string): number {
  const parts = content.split(SLIDE_SEPARATOR);
  return parts.filter((part) => part.trim().length > 0).length;
}

function countSeparatorsBefore(content: string, targetLine: number): number {
  const lines = content.split('\n');
  const lineCount = Math.min(targetLine, lines.length);
  let separators = 0;

  for (let i = 0; i < lineCount; i++) {
    if (SLIDE_SEPARATOR_LINE.test(lines[i] ?? '')) {
      separators += 1;
    }
  }

  return separators;
}

export function mapCursorToSlideIndex(
  cursorInfo: CursorInfo,
  sldFiles: string[],
  fileContents: Map<string, string>,
  totalSlides: number
): number {
  const matchIndex = sldFiles.findIndex(
    (f) => basename(f) === cursorInfo.filename
  );

  if (matchIndex === -1) {
    return 0;
  }

  let precedingSlides = 0;

  for (let i = 0; i < matchIndex; i++) {
    const content = fileContents.get(sldFiles[i] ?? '') ?? '';
    precedingSlides += countSlidesInContent(content);
  }

  const matchedContent = fileContents.get(sldFiles[matchIndex] ?? '') ?? '';
  const localOffset = countSeparatorsBefore(matchedContent, cursorInfo.line);
  const absoluteIndex = precedingSlides + localOffset;

  return Math.min(Math.max(absoluteIndex, 0), Math.max(totalSlides - 1, 0));
}

export async function readCursorFile(cursorPath: string): Promise<CursorInfo | undefined> {
  try {
    const content = await readFile(cursorPath, 'utf8');
    return parseCursorFile(content);
  } catch {
    return undefined;
  }
}
