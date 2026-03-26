import test from 'node:test';
import assert from 'node:assert/strict';
import {centerTextBlock, composeBottomRightOverlayLayout, composeTwoScreenLayout} from '../src/layout.js';

test('centerTextBlock centers a short block with a hint line', () => {
  const output = centerTextBlock('Hello', {
    rows: 7,
    columns: 11,
    hintLine: 'hint'
  });

  assert.equal(output, '\n\n   Hello\n\n\n\nhint');
});

test('centerTextBlock crops long lines to viewport width', () => {
  const output = centerTextBlock('abcdefghijklmnop', {
    rows: 3,
    columns: 5
  });

  assert.match(output, /abcde/);
});

test('centerTextBlock can left-align lines inside a centered block', () => {
  const output = centerTextBlock('Longer\nx', {
    rows: 4,
    columns: 12,
    align: 'left'
  });

  assert.equal(output.split('\n')[1], '   Longer');
  assert.equal(output.split('\n')[2], '   x');
});

test('centerTextBlock can right-align lines inside a centered block', () => {
  const output = centerTextBlock('Longer\nx', {
    rows: 4,
    columns: 12,
    align: 'right'
  });

  assert.equal(output.split('\n')[1], '   Longer');
  assert.equal(output.split('\n')[2], '        x');
});

test('composeBottomRightOverlayLayout anchors overlay bottom-right and keeps text on the left', () => {
  const output = composeBottomRightOverlayLayout('Hello', 'XX\nXX', {
    rows: 6,
    columns: 14
  });
  const lines = output.split('\n');

  assert.equal(lines[2]?.includes('Hello'), true);
  assert.equal(lines[3]?.endsWith('  XX'), true);
  assert.equal(lines[4]?.endsWith('  XX'), true);
});

test('composeBottomRightOverlayLayout uses a tighter gap when compact pane is preferred', () => {
  const output = composeBottomRightOverlayLayout('Hello', 'XX', {
    rows: 4,
    columns: 12,
    align: 'left',
    preferCompactLeftPane: true
  });

  assert.equal(output.split('\n')[2]?.endsWith('  XX'), true);
});

test('centerTextBlock places footnotes at the bottom with a spacer line', () => {
  const output = centerTextBlock('Hello', {
    rows: 6,
    columns: 12,
    footerContent: 'footnote'
  });
  const lines = output.split('\n');

  assert.equal(lines[1], '   Hello');
  assert.equal(lines[4], '');
  assert.equal(lines[5], 'footnote');
});

test('composeTwoScreenLayout places media in the first screen and text in the second', () => {
  const output = composeTwoScreenLayout('XX\nXX', 'Hello', {
    rows: 6,
    columns: 20,
    screens: [
      {widthPercent: 40, contentAlign: 'center'},
      {widthPercent: 60, contentAlign: 'left'}
    ]
  });
  const lines = output.split('\n');

  assert.equal(lines[2]?.startsWith('   XX'), true);
  assert.equal(lines[2]?.includes('Hello'), true);
});

test('composeTwoScreenLayout respects the requested screen widths', () => {
  const narrow = composeTwoScreenLayout('XX', 'Hello', {
    rows: 4,
    columns: 20,
    screens: [
      {widthPercent: 20, contentAlign: 'center'},
      {widthPercent: 80, contentAlign: 'left'}
    ]
  });
  const wide = composeTwoScreenLayout('XX', 'Hello', {
    rows: 4,
    columns: 20,
    screens: [
      {widthPercent: 50, contentAlign: 'center'},
      {widthPercent: 50, contentAlign: 'left'}
    ]
  });

  assert.equal(narrow.split('\n')[1]?.startsWith('  X'), true);
  assert.equal(wide.split('\n')[1]?.startsWith('    XX'), true);
});

test('composeTwoScreenLayout can align media inside the first pane', () => {
  const leftAligned = composeTwoScreenLayout('XX', 'Hello', {
    rows: 4,
    columns: 20,
    screens: [
      {widthPercent: 40, contentAlign: 'left'},
      {widthPercent: 60, contentAlign: 'left'}
    ]
  });
  const rightAligned = composeTwoScreenLayout('XX', 'Hello', {
    rows: 4,
    columns: 20,
    screens: [
      {widthPercent: 40, contentAlign: 'right'},
      {widthPercent: 60, contentAlign: 'left'}
    ]
  });

  assert.equal(leftAligned.split('\n')[1]?.startsWith('  XX'), true);
  assert.equal(rightAligned.split('\n')[1]?.startsWith('    XX'), true);
});

test('composeTwoScreenLayout keeps two spaces of inset for centered media', () => {
  const centered = composeTwoScreenLayout('XX', 'Hello', {
    rows: 4,
    columns: 20,
    screens: [
      {widthPercent: 40, contentAlign: 'center'},
      {widthPercent: 60, contentAlign: 'left'}
    ]
  });

  assert.equal(centered.split('\n')[1]?.startsWith('   XX'), true);
});

test('composeTwoScreenLayout keeps footnote at bottom', () => {
  const output = composeTwoScreenLayout('XX', 'Hello', {
    rows: 6,
    columns: 20,
    screens: [
      {widthPercent: 40, contentAlign: 'center'},
      {widthPercent: 60, contentAlign: 'left'}
    ],
    footerContent: 'foot'
  });
  const lines = output.split('\n');

  assert.equal(lines.some((line, index) => index < 4 && line.startsWith('   XX')), true);
  assert.equal(lines[5], 'foot');
});
