import figlet from 'figlet';

const TITLE_BLOCK_PATTERN = /<title>\s*([\s\S]*?)\s*<\/title>/i;
export function extractTitleBlock(content: string): {body: string; titleText?: string} {
  const match = content.match(TITLE_BLOCK_PATTERN);

  if (!match) {
    return {
      body: content.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '').trimEnd()
    };
  }

  const titleText = match[1].trim();
  const body = content
    .replace(TITLE_BLOCK_PATTERN, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trimEnd();

  return {body, titleText};
}

function renderBaseAscii(line: string): string {
  return figlet.textSync(line, {
    font: 'ANSI Regular',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    whitespaceBreak: true
  }).trimEnd();
}

function buildShadowedAsciiArt(line: string): string {
  return renderBaseAscii(line);
}

function normalizeBlockWidth(block: string): string[] {
  const rows = block.split('\n');
  const width = Math.max(...rows.map((row) => row.length), 0);
  return rows.map((row) => row.padEnd(width, ' '));
}

function centerRow(row: string, width: number): string {
  const extra = Math.max(width - row.length, 0);
  const left = Math.floor(extra / 2);
  const right = extra - left;
  return `${' '.repeat(left)}${row}${' '.repeat(right)}`;
}

export function renderTitleAscii(titleText: string): string {
  const blocks = titleText
    .split('\n')
    .map((line) => line.trim().toUpperCase())
    .filter((line) => line.length > 0)
    .map((line) => normalizeBlockWidth(buildShadowedAsciiArt(line)));
  const maxBlockWidth = Math.max(...blocks.map((block) => block[0]?.length ?? 0), 0);

  return blocks
    .map((block) => block.map((row) => centerRow(row, maxBlockWidth)).join('\n'))
    .join('\n\n');
}
