import {readFile, readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const INDEX_FILE = '.index';

export async function readSlidesFile(path: string): Promise<string> {
  return readFile(path, 'utf8');
}

function stripComments(content: string): string {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

async function resolveOrderedSldFiles(deckDir: string, entries: string[]): Promise<string[]> {
  const indexPath = resolve(deckDir, INDEX_FILE);

  if (existsSync(indexPath)) {
    const indexContent = await readFile(indexPath, 'utf8');
    const stripped = stripComments(indexContent);
    const names = stripped
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    return names.map((name) => resolve(deckDir, `${name}.sld`));
  }

  return entries
    .filter((f) => f.endsWith('.sld'))
    .sort()
    .map((f) => resolve(deckDir, f));
}

export async function readDeckDirectory(deckDir: string): Promise<{source: string; sldFiles: string[]}> {
  const entries = await readdir(deckDir);
  const sldFiles = await resolveOrderedSldFiles(deckDir, entries);

  if (sldFiles.length === 0) {
    throw new Error(`No .sld files found in ${deckDir}`);
  }

  const contents = await Promise.all(sldFiles.map((f) => readFile(f, 'utf8')));
  const normalizedContents = contents.map((c) =>
    /^---\s*$/m.test(c.trimEnd().split('\n').pop() ?? '') ? c : `${c.trimEnd()}\n\n---`
  );
  return {source: normalizedContents.join('\n'), sldFiles};
}
