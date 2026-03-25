import {readFile} from 'node:fs/promises';

export async function readSlidesFile(path: string): Promise<string> {
  return readFile(path, 'utf8');
}
