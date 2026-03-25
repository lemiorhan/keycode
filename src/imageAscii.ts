import {readFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGE_TAG_PATTERN = /<image-url>\s*([\s\S]*?)\s*<\/image-url>/i;

export function extractImageSource(content: string): {body: string; imageSource?: string} {
  const match = content.match(IMAGE_TAG_PATTERN);

  if (!match) {
    return {
      body: content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').trimEnd()
    };
  }

  const imageSource = match[1].trim();
  const body = content
    .replace(IMAGE_TAG_PATTERN, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trimEnd();

  return {body, imageSource};
}

async function loadImageBuffer(imageSource: string, cwd: string): Promise<Buffer> {
  if (/^https?:\/\//i.test(imageSource)) {
    const response = await fetch(imageSource);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    return Buffer.from(await response.arrayBuffer());
  }

  const resolvedPath = path.isAbsolute(imageSource) ? imageSource : path.resolve(cwd, imageSource);
  return readFile(resolvedPath);
}

export async function renderImageAscii(
  imageSource: string,
  options: {cwd: string; maxColumns: number}
): Promise<string> {
  const maxColumns = Math.max(Math.min(options.maxColumns, 96), 28);
  const buffer = await loadImageBuffer(imageSource, options.cwd);
  const prepared = sharp(buffer)
    .ensureAlpha()
    .trim();
  const metadata = await prepared.metadata();
  const sourceWidth = metadata.width ?? maxColumns;
  const sourceHeight = metadata.height ?? maxColumns;
  const width = Math.min(maxColumns, sourceWidth);
  const pixelHeight = Math.max(
    12,
    Math.round((sourceHeight / Math.max(sourceWidth, 1)) * width)
  );
  const {data, info} = await prepared
    .resize({
      width,
      height: pixelHeight,
      fit: 'inside'
    })
    .normalize()
    .modulate({
      brightness: 1.05
    })
    .linear(1.15, -12)
    .sharpen()
    .raw()
    .toBuffer({resolveWithObject: true});

  const rows: string[] = [];
  let openStyles = false;

  const gray = (value: number): number => {
    const normalized = Math.max(0, Math.min(255, value));
    return Math.round(normalized);
  };

  const luminance = (pixelIndex: number): number => {
    const red = data[pixelIndex] ?? 0;
    const green = data[pixelIndex + 1] ?? 0;
    const blue = data[pixelIndex + 2] ?? 0;
    const alpha = data[pixelIndex + 3] ?? 255;
    return ((red * 0.2126) + (green * 0.7152) + (blue * 0.0722)) * (alpha / 255);
  };

  let visibleLeft = info.width;
  let visibleRight = -1;

  for (let row = 0; row < info.height; row += 1) {
    for (let col = 0; col < info.width; col += 1) {
      const pixelIndex = (row * info.width + col) * info.channels;
      const alpha = data[pixelIndex + 3] ?? 255;

      if (alpha < 24) {
        continue;
      }

      if (col < visibleLeft) {
        visibleLeft = col;
      }

      if (col > visibleRight) {
        visibleRight = col;
      }
    }
  }

  if (visibleRight < visibleLeft) {
    return '';
  }

  const horizontalPadding = 1;
  const startCol = Math.max(visibleLeft - horizontalPadding, 0);
  const endCol = Math.min(visibleRight + horizontalPadding, info.width - 1);

  for (let row = 0; row < info.height; row += 2) {
    let line = '';

    for (let col = startCol; col <= endCol; col += 1) {
      const topIndex = (row * info.width + col) * info.channels;
      const bottomIndex = ((Math.min(row + 1, info.height - 1) * info.width) + col) * info.channels;
      const topAlpha = data[topIndex + 3] ?? 255;
      const bottomAlpha = data[bottomIndex + 3] ?? 255;

      if (topAlpha < 24 && bottomAlpha < 24) {
        if (openStyles) {
          line += '\x1b[0m';
          openStyles = false;
        }

        line += ' ';
        continue;
      }

      const topGray = gray(luminance(topIndex));
      const bottomGray = gray(luminance(bottomIndex));

      if (topAlpha < 24) {
        line += `\x1b[38;2;${bottomGray};${bottomGray};${bottomGray}m▄`;
        openStyles = true;
        continue;
      }

      if (bottomAlpha < 24) {
        line += `\x1b[38;2;${topGray};${topGray};${topGray}m▀`;
        openStyles = true;
        continue;
      }

      line += `\x1b[38;2;${topGray};${topGray};${topGray}m\x1b[48;2;${bottomGray};${bottomGray};${bottomGray}m▀`;
      openStyles = true;
    }

    if (openStyles) {
      line += '\x1b[0m';
      openStyles = false;
    }

    rows.push(line);
  }

  return rows.join('\n');
}
