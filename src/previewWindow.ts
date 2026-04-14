import {execFileSync, spawn, type ChildProcess} from 'node:child_process';
import {existsSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, dirname} from 'node:path';
import type {Slide, SlideAlign, SlideScreen} from './types.js';
import {renderSlideFootnote, renderSlideHeader, renderSlideTextContent} from './renderSlide.js';
import {centerTextBlock, centerStackedSections, composeTwoScreenLayout} from './layout.js';
import {slideDefaultAlign} from './slideAlign.js';
import {IMAGE_ANCHOR_TOKEN} from './imageTag.js';
import {readImageSize, resolveDeckImagePath} from './externalQr.js';
import {resolveActiveSlideNumber} from './slideNumber.js';

const PREVIEW_WINDOW_WIDTH_RATIO = 0.50;
const PREVIEW_WINDOW_HEIGHT_RATIO = 0.60;
const PREVIEW_WINDOW_MARGIN = 20;

interface WindowBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function readAppleScript(script: string): string | undefined {
  try {
    return execFileSync('osascript', ['-e', script], {encoding: 'utf8'});
  } catch {
    return undefined;
  }
}

function parseBounds(output: string): WindowBounds | undefined {
  const values = output
    .trim()
    .split(',')
    .map((v) => Number.parseInt(v.trim(), 10));

  if (values.length !== 4 || values.some((v) => Number.isNaN(v))) {
    return undefined;
  }

  const [left, top, right, bottom] = values;
  return {left, top, right, bottom};
}

function terminalWindowBounds(): WindowBounds | undefined {
  const output = readAppleScript('tell application "Terminal" to get bounds of front window');
  return output ? parseBounds(output) : undefined;
}

function screenBounds(): WindowBounds | undefined {
  const output = readAppleScript('tell application "Finder" to get bounds of window of desktop');
  return output ? parseBounds(output) : undefined;
}

function overlaySwiftPath(): string {
  const candidates = [
    fileURLToPath(new URL('../macos/PreviewOverlay.swift', import.meta.url)),
    fileURLToPath(new URL('../../macos/PreviewOverlay.swift', import.meta.url))
  ];

  const match = candidates.find((candidate) => existsSync(candidate));

  if (!match) {
    throw new Error('PreviewOverlay.swift helper not found.');
  }

  return match;
}

function compiledOverlayPath(): string {
  const swiftPath = overlaySwiftPath();
  const binaryPath = join(dirname(swiftPath), '.PreviewOverlay');

  let needsCompile = !existsSync(binaryPath);

  if (!needsCompile) {
    try {
      const srcStat = statSync(swiftPath);
      const binStat = statSync(binaryPath);
      needsCompile = srcStat.mtimeMs > binStat.mtimeMs;
    } catch {
      needsCompile = true;
    }
  }

  if (needsCompile) {
    execFileSync('swiftc', ['-O', '-o', binaryPath, swiftPath], {
      stdio: 'ignore'
    });
  }

  return binaryPath;
}

const REVEAL_SINGLE = /^(\s*)(?<!=)=>(?:\s?)(.*)/;
const REVEAL_GROUP = /^(\s*)==>(?:\s?)(.*)/;

function stripRevealMarkers(body: string): string {
  return body
    .split('\n')
    .map((line) => {
      const groupMatch = line.match(REVEAL_GROUP);

      if (groupMatch) {
        return `${groupMatch[1]}${groupMatch[2]}`;
      }

      const singleMatch = line.match(REVEAL_SINGLE);

      if (singleMatch) {
        return `${singleMatch[1]}${singleMatch[2]}`;
      }

      return line;
    })
    .join('\n');
}

interface PreviewRenderOptions {
  slides: Slide[];
  slideIndex: number;
  rows: number;
  columns: number;
  deckDirectory: string;
}

const GRAY = '\x1b[90m';
const RESET = '\x1b[39m';

function buildImagePlaceholder(
  imagePath: string,
  deckDirectory: string,
  widthPercent: number,
  rows: number,
  columns: number
): string {
  const resolved = resolveDeckImagePath(deckDirectory, imagePath);
  const imageSize = readImageSize(resolved);
  const boxWidth = Math.max(Math.floor(columns * (widthPercent / 100)), 10);

  let boxHeight: number;

  if (imageSize) {
    const aspectRatio = imageSize.height / Math.max(imageSize.width, 1);
    boxHeight = Math.max(Math.round(boxWidth * aspectRatio * 0.5), 3);
    boxHeight = Math.min(boxHeight, Math.floor(rows / 2));
  } else {
    boxHeight = 6;
  }

  const innerWidth = Math.max(boxWidth - 2, 1);
  const topLine = `${GRAY}┌${'─'.repeat(innerWidth)}┐${RESET}`;
  const bottomLine = `${GRAY}└${'─'.repeat(innerWidth)}┘${RESET}`;
  const label = `[image: ${imagePath}]`;
  const labelLine = label.length <= innerWidth
    ? `${GRAY}│${' '.repeat(Math.floor((innerWidth - label.length) / 2))}${label}${' '.repeat(Math.ceil((innerWidth - label.length) / 2))}│${RESET}`
    : `${GRAY}│${label.slice(0, innerWidth)}│${RESET}`;
  const emptyLine = `${GRAY}│${' '.repeat(innerWidth)}│${RESET}`;
  const middleRow = Math.floor((boxHeight - 2) / 2);
  const middleLines = Array.from({length: Math.max(boxHeight - 2, 0)}, (_, i) =>
    i === middleRow ? labelLine : emptyLine
  );

  return [topLine, ...middleLines, bottomLine].join('\n');
}

function stripImageAnchor(content: string): string {
  return content
    .replace(IMAGE_ANCHOR_TOKEN, '')
    .replace(/\n{3,}/g, '\n\n');
}

export function renderPreviewContent(options: PreviewRenderOptions): string {
  const {slides, slideIndex, rows, columns, deckDirectory} = options;
  const slide = slides[slideIndex];

  if (!slide) {
    return '';
  }

  const previewSlide = {...slide, body: stripRevealMarkers(slide.body)};
  const rawTextContent = renderSlideTextContent({slide: previewSlide});
  const textContent = stripImageAnchor(rawTextContent);

  const header = renderSlideHeader(slide);
  const footnote = renderSlideFootnote(slide);
  const align = slideDefaultAlign(slide);

  const hasInlineImage = Boolean(
    slide.imagePath &&
    !(slide.screens && slide.screens.length === 2)
  );
  const imagePlaceholder = hasInlineImage
    ? buildImagePlaceholder(slide.imagePath!, deckDirectory, slide.imageWidthPercent ?? 30, rows, columns)
    : undefined;

  const activeSlideNumber = resolveActiveSlideNumber(slides, slideIndex);
  const topOverlayLine = activeSlideNumber?.vAlign === 'top' ? activeSlideNumber.value : undefined;
  const bottomOverlayLine = activeSlideNumber?.vAlign === 'bottom' ? activeSlideNumber.value : undefined;
  const topOverlayAlign: SlideAlign | undefined = activeSlideNumber?.vAlign === 'top' ? activeSlideNumber.hAlign : undefined;
  const bottomOverlayAlign: SlideAlign | undefined = activeSlideNumber?.vAlign === 'bottom' ? activeSlideNumber.hAlign : undefined;

  const screens =
    slide.screens && slide.screens.length === 2
      ? (slide.screens as [SlideScreen, SlideScreen])
      : undefined;

  if (slide.asciiArt && screens) {
    return composeTwoScreenLayout(slide.asciiArt, textContent, {
      rows,
      columns,
      headerContent: header,
      footerContent: footnote,
      topOverlayLine,
      topOverlayAlign,
      bottomOverlayLine,
      bottomOverlayAlign,
      screens
    });
  }

  if (slide.asciiArt) {
    return centerStackedSections(
      [slide.asciiArt, textContent],
      {
        rows,
        columns,
        align: 'center',
        headerContent: header,
        footerContent: footnote,
        topOverlayLine,
        topOverlayAlign,
        bottomOverlayLine,
        bottomOverlayAlign,
        sectionGap: 1
      }
    );
  }

  if (slide.imagePath && screens) {
    return composeTwoScreenLayout('', textContent, {
      rows,
      columns,
      headerContent: header,
      footerContent: footnote,
      topOverlayLine,
      topOverlayAlign,
      bottomOverlayLine,
      bottomOverlayAlign,
      screens
    });
  }

  if (imagePlaceholder) {
    const sections = textContent.trim().length > 0
      ? [imagePlaceholder, textContent]
      : [imagePlaceholder];

    return centerStackedSections(sections, {
      rows,
      columns,
      align: 'center',
      headerContent: header,
      footerContent: footnote,
      topOverlayLine,
      topOverlayAlign,
      bottomOverlayLine,
      bottomOverlayAlign,
      sectionGap: 1
    });
  }

  return centerTextBlock(textContent, {
    rows,
    columns,
    align,
    headerContent: header,
    footerContent: footnote,
    topOverlayLine,
    topOverlayAlign,
    bottomOverlayLine,
    bottomOverlayAlign,
    forcePerLineCenter: !!slide.titleText
  });
}

export class PreviewViewer {
  private child: ChildProcess | null = null;
  private visible = true;

  open(): void {
    if (process.platform !== 'darwin' || this.child) {
      return;
    }

    const bounds = terminalWindowBounds() ?? screenBounds();

    if (!bounds) {
      return;
    }

    const termWidth = Math.max(bounds.right - bounds.left, 1);
    const termHeight = Math.max(bounds.bottom - bounds.top, 1);
    const width = Math.floor(termWidth * PREVIEW_WINDOW_WIDTH_RATIO);
    const height = Math.floor(termHeight * PREVIEW_WINDOW_HEIGHT_RATIO);
    const left = bounds.right - width - PREVIEW_WINDOW_MARGIN;
    const top = bounds.top + PREVIEW_WINDOW_MARGIN;

    let binaryPath: string;

    try {
      binaryPath = compiledOverlayPath();
    } catch {
      return;
    }

    const child = spawn(
      binaryPath,
      [
        String(left),
        String(top),
        String(width),
        String(height)
      ],
      {
        stdio: ['pipe', 'ignore', 'pipe']
      }
    );

    child.stderr?.on('data', (data: Buffer) => {
      process.stderr.write(`[Preview] ${data.toString()}`);
    });

    child.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        process.stderr.write(`[Preview] swift exited with code ${code}\n`);
      }

      if (this.child === child) {
        this.child = null;
      }
    });

    this.child = child;
  }

  update(options: PreviewRenderOptions): void {
    if (!this.child || !this.child.stdin || this.child.stdin.destroyed) {
      return;
    }

    const content = renderPreviewContent(options);

    try {
      this.child.stdin.write(`${content}\n---END---\n`);
    } catch {
      // stdin may be closed if the process exited.
    }
  }

  hide(): void {
    this.sendCommand('---HIDE---');
    this.visible = false;
  }

  show(): void {
    this.sendCommand('---SHOW---');
    this.visible = true;
  }

  toggle(): boolean {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }

    return this.visible;
  }

  isVisible(): boolean {
    return this.visible;
  }

  private sendCommand(command: string): void {
    if (!this.child || !this.child.stdin || this.child.stdin.destroyed) {
      return;
    }

    try {
      this.child.stdin.write(`${command}\n---END---\n`);
    } catch {
      // stdin may be closed if the process exited.
    }
  }

  close(): void {
    if (this.child && !this.child.killed) {
      try {
        this.child.stdin?.end();
      } catch {
        // ignore
      }
      this.child.kill('SIGTERM');
    }

    this.child = null;
  }
}
