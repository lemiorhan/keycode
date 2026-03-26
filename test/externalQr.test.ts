import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, stat, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {
  ensureQrImage,
  overlayFrame,
  overlayFrameInPane,
  overlayTopLeft,
  paneBounds,
  qrImageFilename,
  resolveDeckImagePath
} from '../src/externalQr.js';

test('qrImageFilename is deterministic for the same payload', () => {
  const payload = 'https://example.com/talk';

  assert.equal(qrImageFilename(payload), qrImageFilename(payload));
});

test('ensureQrImage generates a png when missing', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'keycode-qr-'));
  const imagePath = await ensureQrImage(directory, 'https://example.com/talk');
  const fileStat = await stat(imagePath);

  assert.equal(imagePath.endsWith('.png'), true);
  assert.equal(fileStat.size > 0, true);
});

test('ensureQrImage reuses an existing file if present', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'keycode-qr-'));
  const imagePath = join(directory, qrImageFilename('https://example.com/talk'));
  await writeFile(imagePath, 'existing');
  const beforeStat = await stat(imagePath);

  const resolvedPath = await ensureQrImage(directory, 'https://example.com/talk');
  const afterStat = await stat(imagePath);

  assert.equal(resolvedPath, imagePath);
  assert.equal(beforeStat.size, afterStat.size);
});

test('overlayTopLeft anchors the overlay to the bottom-right of a window', () => {
  const overlay = overlayTopLeft({
    left: 100,
    top: 80,
    right: 900,
    bottom: 700
  });

  assert.equal(overlay.x, 460);
  assert.equal(overlay.top, 260);
});

test('overlayFrame places an image on the left and centers it vertically', () => {
  const frame = overlayFrame(
    {
      left: 100,
      top: 80,
      right: 900,
      bottom: 700
    },
    {
      intrinsicWidth: 1200,
      intrinsicHeight: 600,
      widthPercent: 30,
      position: 'left',
      align: 'center'
    }
  );

  assert.equal(frame.left, 120);
  assert.equal(frame.width, 228);
  assert.equal(frame.height, 114);
  assert.equal(frame.top, 333);
});

test('paneBounds returns the selected left or right pane bounds', () => {
  const bounds = {
    left: 100,
    top: 80,
    right: 900,
    bottom: 700
  };

  assert.deepEqual(paneBounds(bounds, 'left', 40), {
    left: 100,
    top: 80,
    right: 420,
    bottom: 700
  });
  assert.deepEqual(paneBounds(bounds, 'right', 60), {
    left: 420,
    top: 80,
    right: 900,
    bottom: 700
  });
});

test('overlayFrameInPane centers an image horizontally inside the selected pane', () => {
  const frame = overlayFrameInPane(
    {
      left: 100,
      top: 80,
      right: 900,
      bottom: 700
    },
    {
      intrinsicWidth: 1200,
      intrinsicHeight: 600,
      widthPercent: 50,
      paneSide: 'right',
      paneWidthPercent: 60,
      horizontalAlign: 'center',
      align: 'center'
    }
  );

  assert.equal(frame.width, 220);
  assert.equal(frame.height, 110);
  assert.equal(frame.left, 550);
  assert.equal(frame.top, 335);
});

test('resolveDeckImagePath resolves relative image paths from the deck folder', () => {
  assert.equal(
    resolveDeckImagePath('/tmp/deck', 'images/speaker.png'),
    '/tmp/deck/images/speaker.png'
  );
  assert.equal(
    resolveDeckImagePath('/tmp/deck', '/Users/example/speaker.png'),
    '/Users/example/speaker.png'
  );
});
