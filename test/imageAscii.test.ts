import path from 'node:path';
import {mkdtemp, writeFile} from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import {tmpdir} from 'node:os';
import sharp from 'sharp';
import {extractImageSource, renderImageAscii} from '../src/imageAscii.js';

test('extractImageSource removes image-url block and returns source', () => {
  const extracted = extractImageSource(`
<image-url>
lemi.png
</image-url>
Caption
`);

  assert.equal(extracted.imageSource, 'lemi.png');
  assert.equal(extracted.body, 'Caption');
});

test('renderImageAscii converts a local image into multiline ascii', async () => {
  const fixtureDir = await mkdtemp(path.join(tmpdir(), 'present-image-'));
  const fixturePath = path.join(fixtureDir, 'fixture.png');
  const buffer = await sharp({
    create: {
      width: 12,
      height: 12,
      channels: 4,
      background: {r: 0, g: 0, b: 0, alpha: 0}
    }
  })
    .composite([
      {
        input: {
          create: {
            width: 8,
            height: 8,
            channels: 4,
            background: {r: 240, g: 240, b: 240, alpha: 1}
          }
        },
        top: 2,
        left: 2
      }
    ])
    .png()
    .toBuffer();
  await writeFile(fixturePath, buffer);

  const ascii = await renderImageAscii('fixture.png', {
    cwd: fixtureDir,
    maxColumns: 36
  });

  assert.equal(ascii.includes('\n'), true);
  assert.match(ascii, /[@08GCLtf1i;:,. ]/);
});
