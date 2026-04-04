import {constants} from 'node:fs';
import {access, mkdir, stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync, spawn, type ChildProcess} from 'node:child_process';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import QRCode from 'qrcode';
import type {QrColors, SlideAlign, SlideScreen, SlideSide} from './types.js';

const EXTERNAL_QR_WIDTH = 360;
const OVERLAY_WINDOW_WIDTH = 420;
const OVERLAY_WINDOW_HEIGHT = 420;
const OVERLAY_WINDOW_MARGIN = 20;

export type OverlayAlign = 'top' | 'center' | 'bottom';

interface WindowBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

function slugifyPayload(value: string): string {
  return value
    .toLowerCase()
    .replace(/https?:\/\//g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32) || 'qr';
}

function parseBounds(output: string): WindowBounds | undefined {
  const values = output
    .trim()
    .split(',')
    .map((value) => Number.parseInt(value.trim(), 10));

  if (values.length !== 4 || values.some((value) => Number.isNaN(value))) {
    return undefined;
  }

  const [left, top, right, bottom] = values;
  return {left, top, right, bottom};
}

function readAppleScript(script: string): string | undefined {
  try {
    return execFileSync('osascript', ['-e', script], {
      encoding: 'utf8'
    });
  } catch {
    return undefined;
  }
}

function terminalWindowBounds(): WindowBounds | undefined {
  const output = readAppleScript('tell application "Terminal" to get bounds of front window');
  return output ? parseBounds(output) : undefined;
}

function screenBounds(): WindowBounds | undefined {
  const output = readAppleScript('tell application "Finder" to get bounds of window of desktop');
  return output ? parseBounds(output) : undefined;
}

export function overlayTopLeft(bounds: WindowBounds): {x: number; top: number} {
  return {
    x: bounds.right - OVERLAY_WINDOW_WIDTH - OVERLAY_WINDOW_MARGIN,
    top: bounds.bottom - OVERLAY_WINDOW_HEIGHT - OVERLAY_WINDOW_MARGIN
  };
}

export function resolveDeckImagePath(deckDirectory: string, imagePath: string): string {
  return imagePath.startsWith('/') ? imagePath : join(deckDirectory, 'images', imagePath);
}

interface OverlayFrameOptions {
  intrinsicWidth: number;
  intrinsicHeight: number;
  widthPercent: number;
  position: SlideSide;
  align: OverlayAlign;
}

export function overlayFrame(bounds: WindowBounds, options: OverlayFrameOptions): {
  left: number;
  top: number;
  width: number;
  height: number;
} {
  const usableWidth = Math.max(bounds.right - bounds.left - OVERLAY_WINDOW_MARGIN * 2, 1);
  const usableHeight = Math.max(bounds.bottom - bounds.top - OVERLAY_WINDOW_MARGIN * 2, 1);
  let width = Math.max(Math.floor(usableWidth * (options.widthPercent / 100)), 1);
  let height = Math.max(
    Math.round(width * (options.intrinsicHeight / Math.max(options.intrinsicWidth, 1))),
    1
  );

  if (height > usableHeight) {
    const scale = usableHeight / height;
    height = usableHeight;
    width = Math.max(Math.floor(width * scale), 1);
  }

  const left =
    options.position === 'left'
      ? bounds.left + OVERLAY_WINDOW_MARGIN
      : bounds.right - width - OVERLAY_WINDOW_MARGIN;
  const top =
    options.align === 'top'
      ? bounds.top + OVERLAY_WINDOW_MARGIN
      : options.align === 'center'
        ? bounds.top + Math.max(Math.floor((bounds.bottom - bounds.top - height) / 2), 0)
        : bounds.bottom - height - OVERLAY_WINDOW_MARGIN;

  return {left, top, width, height};
}

interface OverlayCellFrameOptions {
  intrinsicWidth: number;
  intrinsicHeight: number;
  widthPercent: number;
  anchorRow: number;
  anchorColumn: number;
  terminalRows: number;
  terminalColumns: number;
}

export function overlayFrameAtCell(
  bounds: WindowBounds,
  options: OverlayCellFrameOptions
): {left: number; top: number; width: number; height: number} {
  const usableWidth = Math.max(bounds.right - bounds.left - OVERLAY_WINDOW_MARGIN * 2, 1);
  const usableHeight = Math.max(bounds.bottom - bounds.top - OVERLAY_WINDOW_MARGIN * 2, 1);
  let width = Math.max(Math.floor(usableWidth * (options.widthPercent / 100)), 1);
  let height = Math.max(
    Math.round(width * (options.intrinsicHeight / Math.max(options.intrinsicWidth, 1))),
    1
  );

  if (height > usableHeight) {
    const scale = usableHeight / height;
    height = usableHeight;
    width = Math.max(Math.floor(width * scale), 1);
  }

  const cellWidth = usableWidth / Math.max(options.terminalColumns, 1);
  const cellHeight = usableHeight / Math.max(options.terminalRows, 1);
  const centerX =
    bounds.left + OVERLAY_WINDOW_MARGIN + (options.anchorColumn + 0.5) * cellWidth;
  const centerY =
    bounds.top + OVERLAY_WINDOW_MARGIN + (options.anchorRow + 0.5) * cellHeight;
  const minLeft = bounds.left + OVERLAY_WINDOW_MARGIN;
  const maxLeft = bounds.right - OVERLAY_WINDOW_MARGIN - width;
  const minTop = bounds.top + OVERLAY_WINDOW_MARGIN;
  const maxTop = bounds.bottom - OVERLAY_WINDOW_MARGIN - height;
  const left = Math.min(Math.max(Math.round(centerX - width / 2), minLeft), maxLeft);
  const top = Math.min(Math.max(Math.round(centerY - height / 2), minTop), maxTop);

  return {left, top, width, height};
}

interface OverlayPaneFrameOptions {
  intrinsicWidth: number;
  intrinsicHeight: number;
  widthPercent: number;
  paneSide: SlideSide;
  paneWidthPercent: number;
  horizontalAlign: SlideAlign;
  align: OverlayAlign;
}

export function paneBounds(
  bounds: WindowBounds,
  paneSide: SlideSide,
  paneWidthPercent: number
): WindowBounds {
  const totalWidth = Math.max(bounds.right - bounds.left, 1);
  const paneWidth = Math.max(Math.floor(totalWidth * (paneWidthPercent / 100)), 1);

  if (paneSide === 'left') {
    return {
      left: bounds.left,
      top: bounds.top,
      right: bounds.left + paneWidth,
      bottom: bounds.bottom
    };
  }

  return {
    left: bounds.right - paneWidth,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}

export function overlayFrameInPane(
  bounds: WindowBounds,
  options: OverlayPaneFrameOptions
): {left: number; top: number; width: number; height: number} {
  const pane = paneBounds(bounds, options.paneSide, options.paneWidthPercent);
  const usableWidth = Math.max(pane.right - pane.left - OVERLAY_WINDOW_MARGIN * 2, 1);
  const usableHeight = Math.max(pane.bottom - pane.top - OVERLAY_WINDOW_MARGIN * 2, 1);
  let width = Math.max(Math.floor(usableWidth * (options.widthPercent / 100)), 1);
  let height = Math.max(
    Math.round(width * (options.intrinsicHeight / Math.max(options.intrinsicWidth, 1))),
    1
  );

  if (height > usableHeight) {
    const scale = usableHeight / height;
    height = usableHeight;
    width = Math.max(Math.floor(width * scale), 1);
  }

  const innerPadding = OVERLAY_WINDOW_MARGIN;
  const available = Math.max(pane.right - pane.left - innerPadding * 2 - width, 0);
  const left =
    options.horizontalAlign === 'left'
      ? pane.left + innerPadding
      : options.horizontalAlign === 'right'
        ? pane.right - innerPadding - width
        : pane.left + innerPadding + Math.floor(available / 2);
  const top =
    options.align === 'top'
      ? pane.top + OVERLAY_WINDOW_MARGIN
      : options.align === 'center'
        ? pane.top + Math.max(Math.floor((pane.bottom - pane.top - height) / 2), 0)
        : pane.bottom - height - OVERLAY_WINDOW_MARGIN;

  return {left, top, width, height};
}

export function readImageSize(imagePath: string): {width: number; height: number} | undefined {
  try {
    const output = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', imagePath], {
      encoding: 'utf8'
    });
    const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
    const width = Number(widthMatch?.[1]);
    const height = Number(heightMatch?.[1]);

    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      return undefined;
    }

    return {width, height};
  } catch {
    return undefined;
  }
}

function overlayScriptPath(): string {
  const candidates = [
    fileURLToPath(new URL('../macos/QROverlay.swift', import.meta.url)),
    fileURLToPath(new URL('../../macos/QROverlay.swift', import.meta.url))
  ];

  const match = candidates.find((candidate) => existsSync(candidate));

  if (!match) {
    throw new Error('QROverlay.swift helper not found.');
  }

  return match;
}

export function qrImageFilename(payload: string): string {
  return qrImageFilenameForColors(payload, 'black-on-white');
}

export function qrImageFilenameForColors(payload: string, colors: QrColors): string {
  const hash = createHash('sha1').update(payload).digest('hex').slice(0, 10);
  return `${slugifyPayload(payload)}-${hash}-${colors}-w${EXTERNAL_QR_WIDTH}.png`;
}

export async function ensureQrImage(
  deckDirectory: string,
  payload: string,
  colors: QrColors = 'black-on-white'
): Promise<string> {
  const imagesDirectory = join(deckDirectory, 'images');
  await mkdir(imagesDirectory, {recursive: true});
  const imagePath = join(imagesDirectory, qrImageFilenameForColors(payload, colors));

  try {
    await access(imagePath, constants.F_OK);
    const fileStat = await stat(imagePath);

    if (fileStat.size > 0) {
      return imagePath;
    }
  } catch {
    // Generate below when missing or unreadable.
  }

  await QRCode.toFile(imagePath, payload, {
    errorCorrectionLevel: 'M',
    margin: 4,
    width: EXTERNAL_QR_WIDTH,
    type: 'png',
    color:
      colors === 'white-on-black'
        ? {
            dark: '#FFFFFFFF',
            light: '#000000FF'
          }
        : colors === 'white-on-transparent'
          ? {
              dark: '#FFFFFFFF',
              light: '#00000000'
            }
        : {
            dark: '#000000',
            light: '#FFFFFFFF'
          }
  });

  return imagePath;
}

export class ExternalMediaViewer {
  private child: ChildProcess | null = null;
  private currentKey: string | null = null;

  open(
    imagePath: string,
    options: {
      position?: SlideSide;
      align?: OverlayAlign;
      widthPercent?: number;
      panePosition?: SlideSide;
      screens?: [SlideScreen, SlideScreen];
      intrinsicWidth?: number;
      intrinsicHeight?: number;
      backgroundColor?: string;
      anchorRow?: number;
      anchorColumn?: number;
      terminalRows?: number;
      terminalColumns?: number;
    } = {}
  ): void {
    if (process.platform !== 'darwin') {
      return;
    }

    const imageSize =
      options.intrinsicWidth && options.intrinsicHeight
        ? {width: options.intrinsicWidth, height: options.intrinsicHeight}
        : readImageSize(imagePath);

    if (!imageSize) {
      return;
    }

    const position = options.position ?? 'right';
    const align = options.align ?? 'bottom';
    const widthPercent = options.widthPercent ?? 30;
    const backgroundColor = options.backgroundColor ?? 'transparent';
    const panePosition = options.panePosition;
    const paneKey = panePosition && options.screens
      ? `${panePosition}:${options.screens[0].widthPercent}/${options.screens[1].widthPercent}`
      : 'none';
    const anchorKey =
      options.anchorRow !== undefined &&
      options.anchorColumn !== undefined &&
      options.terminalRows !== undefined &&
      options.terminalColumns !== undefined
        ? `${options.anchorRow}:${options.anchorColumn}:${options.terminalRows}:${options.terminalColumns}`
        : 'none';
    const currentKey = `${imagePath}|${position}|${align}|${widthPercent}|${backgroundColor}|${paneKey}|${imageSize.width}x${imageSize.height}`;
    const keyedCurrent = `${currentKey}|${anchorKey}`;

    if (this.currentKey === keyedCurrent && this.child && !this.child.killed) {
      return;
    }

    this.close();

    const bounds = terminalWindowBounds() ?? screenBounds();

    if (!bounds) {
      return;
    }

    const frame =
      options.anchorRow !== undefined &&
      options.anchorColumn !== undefined &&
      options.terminalRows !== undefined &&
      options.terminalColumns !== undefined
        ? overlayFrameAtCell(bounds, {
            intrinsicWidth: imageSize.width,
            intrinsicHeight: imageSize.height,
            widthPercent,
            anchorRow: options.anchorRow,
            anchorColumn: options.anchorColumn,
            terminalRows: options.terminalRows,
            terminalColumns: options.terminalColumns
          })
        : panePosition && options.screens
        ? overlayFrameInPane(bounds, {
            intrinsicWidth: imageSize.width,
            intrinsicHeight: imageSize.height,
            widthPercent,
            paneSide: panePosition,
            paneWidthPercent:
              panePosition === 'left' ? options.screens[0].widthPercent : options.screens[1].widthPercent,
            horizontalAlign:
              panePosition === 'left'
                ? options.screens[0].contentAlign
                : options.screens[1].contentAlign,
            align
          })
        : overlayFrame(bounds, {
            intrinsicWidth: imageSize.width,
            intrinsicHeight: imageSize.height,
            widthPercent,
            position,
            align
          });
    const child = spawn(
      'swift',
      [
        overlayScriptPath(),
        imagePath,
        String(frame.left),
        String(frame.top),
        String(frame.width),
        String(frame.height),
        backgroundColor
      ],
      {
        stdio: 'ignore'
      }
    );

    child.on('exit', () => {
      if (this.child === child) {
        this.child = null;
        this.currentKey = null;
      }
    });

    this.child = child;
    this.currentKey = keyedCurrent;
  }

  close(): void {
    if (this.child && !this.child.killed) {
      this.child.kill('SIGTERM');
    }

    this.child = null;
    this.currentKey = null;
  }
}
