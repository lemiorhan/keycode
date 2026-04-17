import test from 'node:test';
import assert from 'node:assert/strict';
import {parseAnsiSegments, computeGridGeometry, PAGE_WIDTH, PAGE_HEIGHT} from '../src/pdfRenderer.js';

test('parseAnsiSegments returns single segment for plain text', () => {
  const segments = parseAnsiSegments('Hello world');
  assert.equal(segments.length, 1);
  assert.equal(segments[0].text, 'Hello world');
  assert.equal(segments[0].color, '#f1f1f0');
});

test('parseAnsiSegments returns empty array for empty string', () => {
  const segments = parseAnsiSegments('');
  assert.equal(segments.length, 0);
});

test('parseAnsiSegments parses single color code', () => {
  const segments = parseAnsiSegments('\x1b[31mRed text\x1b[39m');
  assert.equal(segments.length, 1);
  assert.equal(segments[0].text, 'Red text');
  assert.equal(segments[0].color, '#ff5f56');
});

test('parseAnsiSegments parses multiple color changes', () => {
  const segments = parseAnsiSegments('\x1b[31mRed\x1b[32mGreen\x1b[39mDefault');
  assert.equal(segments.length, 3);
  assert.equal(segments[0].text, 'Red');
  assert.equal(segments[0].color, '#ff5f56');
  assert.equal(segments[1].text, 'Green');
  assert.equal(segments[1].color, '#5af78e');
  assert.equal(segments[2].text, 'Default');
  assert.equal(segments[2].color, '#f1f1f0');
});

test('parseAnsiSegments handles text before first ANSI code', () => {
  const segments = parseAnsiSegments('Before\x1b[33mYellow');
  assert.equal(segments.length, 2);
  assert.equal(segments[0].text, 'Before');
  assert.equal(segments[0].color, '#f1f1f0');
  assert.equal(segments[1].text, 'Yellow');
  assert.equal(segments[1].color, '#f3f99d');
});

test('parseAnsiSegments handles gray dim code', () => {
  const segments = parseAnsiSegments('\x1b[90mDimmed\x1b[39m');
  assert.equal(segments.length, 1);
  assert.equal(segments[0].text, 'Dimmed');
  assert.equal(segments[0].color, '#686868');
});

test('parseAnsiSegments handles reset code 0', () => {
  const segments = parseAnsiSegments('\x1b[31mRed\x1b[0mReset');
  assert.equal(segments.length, 2);
  assert.equal(segments[0].color, '#ff5f56');
  assert.equal(segments[1].color, '#f1f1f0');
});

test('parseAnsiSegments skips empty text between consecutive codes', () => {
  const segments = parseAnsiSegments('\x1b[31m\x1b[32mGreen');
  assert.equal(segments.length, 1);
  assert.equal(segments[0].text, 'Green');
  assert.equal(segments[0].color, '#5af78e');
});

test('parseAnsiSegments maps all known color codes', () => {
  const colorMap: Record<string, string> = {
    '31': '#ff5f56',
    '32': '#5af78e',
    '33': '#f3f99d',
    '34': '#57c7ff',
    '35': '#ff6ac1',
    '36': '#9aedfe',
    '37': '#f1f1f0',
    '90': '#686868'
  };

  for (const [code, hex] of Object.entries(colorMap)) {
    const segments = parseAnsiSegments(`\x1b[${code}mText\x1b[39m`);
    assert.equal(segments[0].color, hex, `ANSI code ${code} should map to ${hex}`);
  }
});

test('computeGridGeometry calculates dimensions at zoom 1.0', () => {
  const geo = computeGridGeometry(40, 120, 1.0, 0.6);

  assert.ok(geo.fontSize > 0);
  assert.ok(geo.cellWidth > 0);
  assert.ok(geo.cellHeight > 0);
  assert.ok(geo.marginLeft >= 0);
  assert.ok(geo.marginTop >= 0);

  const totalWidth = geo.gridWidth + 2 * geo.marginLeft;
  assert.ok(totalWidth <= PAGE_WIDTH + 1, 'Grid should fit within page width');

  const totalHeight = geo.gridHeight + 2 * geo.marginTop;
  assert.ok(totalHeight <= PAGE_HEIGHT + 1, 'Grid should fit within page height');
});

test('computeGridGeometry scales with zoom', () => {
  const geo1 = computeGridGeometry(40, 120, 1.0, 0.6);
  const geo2 = computeGridGeometry(40, 120, 2.0, 0.6);

  assert.ok(Math.abs(geo2.fontSize - geo1.fontSize * 2) < 0.01, 'Font size should double at zoom 2.0');
  assert.ok(Math.abs(geo2.cellWidth - geo1.cellWidth * 2) < 0.01, 'Cell width should double at zoom 2.0');
});

test('computeGridGeometry cell dimensions match font ratios', () => {
  const ratio = 0.55;
  const geo = computeGridGeometry(40, 120, 1.0, ratio);

  assert.ok(Math.abs(geo.cellWidth - geo.fontSize * ratio) < 0.01);
  assert.ok(Math.abs(geo.cellHeight - geo.fontSize * 1.35) < 0.01);
});

test('computeGridGeometry uses custom charWidthRatio', () => {
  const geo06 = computeGridGeometry(40, 120, 1.0, 0.6);
  const geo055 = computeGridGeometry(40, 120, 1.0, 0.55);

  assert.ok(geo055.cellWidth < geo06.cellWidth, 'Narrower ratio should produce narrower cells');
  assert.ok(geo055.gridWidth < geo06.gridWidth, 'Narrower ratio should produce narrower grid');
  assert.ok(geo055.marginLeft > geo06.marginLeft, 'Narrower grid should have larger margins');
});
