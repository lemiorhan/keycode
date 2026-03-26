const COLOR_TAG_PATTERN = /<color\s+fg="(red|green|yellow|blue|magenta|cyan|white|gray)">([\s\S]*?)<\/color>/gi;

const ANSI_COLORS: Record<string, string> = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

const ANSI_RESET = '\x1b[39m';

export function renderInlineColors(content: string): string {
  return content.replace(COLOR_TAG_PATTERN, (_, colorName: string, innerText: string) => {
    const color = ANSI_COLORS[colorName];

    if (!color) {
      return innerText;
    }

    return `${color}${innerText}${ANSI_RESET}`;
  });
}
