import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, rm, mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {readDeckDirectory} from '../src/file.js';

async function createTempDeck(files: Record<string, string>): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'keycode-test-'));
  for (const [name, content] of Object.entries(files)) {
    const filePath = join(dir, name);
    const parentDir = filePath.substring(0, filePath.lastIndexOf('/'));
    await mkdir(parentDir, {recursive: true});
    await writeFile(filePath, content, 'utf8');
  }
  return dir;
}

test('readDeckDirectory uses alphabetical order when no .index file exists', async () => {
  const dir = await createTempDeck({
    'beta.sld': 'Slide B',
    'alpha.sld': 'Slide A',
    'gamma.sld': 'Slide G'
  });

  try {
    const {source, sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 3);
    assert.ok(sldFiles[0].endsWith('alpha.sld'));
    assert.ok(sldFiles[1].endsWith('beta.sld'));
    assert.ok(sldFiles[2].endsWith('gamma.sld'));
    assert.equal(source, 'Slide A\n\n---\nSlide B\n\n---\nSlide G\n\n---');
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory uses .index file order when it exists', async () => {
  const dir = await createTempDeck({
    'beta.sld': 'Slide B',
    'alpha.sld': 'Slide A',
    'gamma.sld': 'Slide G',
    '.index': 'gamma\nbeta\nalpha'
  });

  try {
    const {source, sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 3);
    assert.ok(sldFiles[0].endsWith('gamma.sld'));
    assert.ok(sldFiles[1].endsWith('beta.sld'));
    assert.ok(sldFiles[2].endsWith('alpha.sld'));
    assert.equal(source, 'Slide G\n\n---\nSlide B\n\n---\nSlide A\n\n---');
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory ignores blank lines and whitespace in .index', async () => {
  const dir = await createTempDeck({
    'first.sld': 'First',
    'second.sld': 'Second',
    '.index': '  first  \n\n  second  \n'
  });

  try {
    const {source, sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 2);
    assert.ok(sldFiles[0].endsWith('first.sld'));
    assert.ok(sldFiles[1].endsWith('second.sld'));
    assert.equal(source, 'First\n\n---\nSecond\n\n---');
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory with empty .index file returns no slides', async () => {
  const dir = await createTempDeck({
    'alpha.sld': 'Slide A',
    '.index': ''
  });

  try {
    await assert.rejects(
      () => readDeckDirectory(dir),
      {message: `No .sld files found in ${dir}`}
    );
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory .index can include subset of available files', async () => {
  const dir = await createTempDeck({
    'alpha.sld': 'Slide A',
    'beta.sld': 'Slide B',
    'gamma.sld': 'Slide G',
    '.index': 'beta\nalpha'
  });

  try {
    const {source, sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 2);
    assert.ok(sldFiles[0].endsWith('beta.sld'));
    assert.ok(sldFiles[1].endsWith('alpha.sld'));
    assert.equal(source, 'Slide B\n\n---\nSlide A\n\n---');
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory does not double-append separator when file already ends with ---', async () => {
  const dir = await createTempDeck({
    'alpha.sld': 'Slide A\n\n---',
    'beta.sld': 'Slide B'
  });

  try {
    const {source} = await readDeckDirectory(dir);
    assert.equal(source, 'Slide A\n\n---\nSlide B\n\n---');
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory ignores single-line comments in .index', async () => {
  const dir = await createTempDeck({
    'alpha.sld': 'Slide A',
    'beta.sld': 'Slide B',
    'gamma.sld': 'Slide G',
    '.index': '// intro section\nalpha\n// middle\nbeta\ngamma // inline'
  });

  try {
    const {sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 3);
    assert.ok(sldFiles[0].endsWith('alpha.sld'));
    assert.ok(sldFiles[1].endsWith('beta.sld'));
    assert.ok(sldFiles[2].endsWith('gamma.sld'));
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory ignores multi-line comments in .index', async () => {
  const dir = await createTempDeck({
    'alpha.sld': 'Slide A',
    'beta.sld': 'Slide B',
    '.index': 'alpha\n/* temporarily\ndisabled\nbeta\n*/\nbeta'
  });

  try {
    const {sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 2);
    assert.ok(sldFiles[0].endsWith('alpha.sld'));
    assert.ok(sldFiles[1].endsWith('beta.sld'));
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory handles mixed comments and blank lines in .index', async () => {
  const dir = await createTempDeck({
    'alpha.sld': 'Slide A',
    'beta.sld': 'Slide B',
    '.index': '// header\n\nalpha\n\n/* skip */\n\nbeta\n// end'
  });

  try {
    const {sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 2);
    assert.ok(sldFiles[0].endsWith('alpha.sld'));
    assert.ok(sldFiles[1].endsWith('beta.sld'));
  } finally {
    await rm(dir, {recursive: true});
  }
});

test('readDeckDirectory ignores non-.sld files when no .index exists', async () => {
  const dir = await createTempDeck({
    'alpha.sld': 'Slide A',
    'readme.txt': 'Not a slide',
    '.index-backup': 'not the index'
  });

  try {
    const {source, sldFiles} = await readDeckDirectory(dir);
    assert.equal(sldFiles.length, 1);
    assert.ok(sldFiles[0].endsWith('alpha.sld'));
    assert.equal(source, 'Slide A\n\n---');
  } finally {
    await rm(dir, {recursive: true});
  }
});
