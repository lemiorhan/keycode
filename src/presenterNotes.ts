import {execFileSync, spawn, type ChildProcess} from 'node:child_process';
import {existsSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, dirname} from 'node:path';
import {renderInlineColors} from './colorText.js';
import {renderParagraphBlocks} from './paragraphTag.js';

const NOTES_WINDOW_WIDTH_RATIO = 0.30;
const NOTES_WINDOW_HEIGHT_RATIO = 0.40;
const NOTES_WINDOW_MARGIN = 20;

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
    fileURLToPath(new URL('../macos/PresenterNotesOverlay.swift', import.meta.url)),
    fileURLToPath(new URL('../../macos/PresenterNotesOverlay.swift', import.meta.url))
  ];

  const match = candidates.find((candidate) => existsSync(candidate));

  if (!match) {
    throw new Error('PresenterNotesOverlay.swift helper not found.');
  }

  return match;
}

function compiledOverlayPath(): string {
  const swiftPath = overlaySwiftPath();
  const binaryPath = join(dirname(swiftPath), '.PresenterNotesOverlay');

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

export function renderPresenterNotes(notes: string): string {
  const withParagraphs = renderParagraphBlocks(notes);
  return renderInlineColors(withParagraphs);
}

export class PresenterNotesViewer {
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
    const width = Math.floor(termWidth * NOTES_WINDOW_WIDTH_RATIO);
    const height = Math.floor(termHeight * NOTES_WINDOW_HEIGHT_RATIO);
    const left = bounds.left + NOTES_WINDOW_MARGIN;
    const top = bounds.bottom - height - NOTES_WINDOW_MARGIN;

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
      process.stderr.write(`[PresenterNotes] ${data.toString()}`);
    });

    child.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        process.stderr.write(`[PresenterNotes] swift exited with code ${code}\n`);
      }

      if (this.child === child) {
        this.child = null;
      }
    });

    this.child = child;
  }

  update(notes: string | undefined): void {
    if (!this.child || !this.child.stdin || this.child.stdin.destroyed) {
      return;
    }

    const content = notes ? renderPresenterNotes(notes) : '';

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
