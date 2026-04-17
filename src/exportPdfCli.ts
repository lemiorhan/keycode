import {resolve} from 'node:path';
import {exportDeckToPdf} from './exportPdf.js';

async function main(): Promise<void> {
  const deckDirInput = process.argv[2];

  if (!deckDirInput) {
    console.error('Usage: keycode exportToPdf <deck-name> [--zoom=N]');
    process.exit(1);
  }

  const args = process.argv.slice(3);
  let zoom = 1.0;

  for (const arg of args) {
    const zoomMatch = arg.match(/^--zoom=(\d+(?:\.\d+)?)$/);

    if (zoomMatch) {
      zoom = Number(zoomMatch[1]);
    }
  }

  if (zoom <= 0 || !Number.isFinite(zoom)) {
    console.error('Error: --zoom must be a positive number');
    process.exit(1);
  }

  const deckDirectory = resolve(deckDirInput);

  console.log(`Exporting deck to PDF (zoom: ${zoom})...`);

  try {
    const outputPath = await exportDeckToPdf(deckDirectory, {zoom});
    console.log(`PDF exported: ${outputPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

main();
