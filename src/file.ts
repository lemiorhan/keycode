import {readFile, readdir} from 'node:fs/promises';
import {resolve} from 'node:path';

export async function readSlidesFile(path: string): Promise<string> {
  return readFile(path, 'utf8');
}

export async function readDeckDirectory(deckDir: string): Promise<{source: string; sldFiles: string[]}> {
  const entries = await readdir(deckDir);
  const sldFiles = entries
    .filter((f) => f.endsWith('.sld'))
    .sort()
    .map((f) => resolve(deckDir, f));

  if (sldFiles.length === 0) {
    throw new Error(`No .sld files found in ${deckDir}`);
  }

  const contents = await Promise.all(sldFiles.map((f) => readFile(f, 'utf8')));
  return {source: contents.join('\n'), sldFiles};
}
