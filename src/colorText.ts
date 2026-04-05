const COLOR_NAME_PATTERN = 'red|green|yellow|blue|magenta|cyan|white|gray';

export const COLOR_TAG_PATTERN = new RegExp(
  `<color\\s+fg=(?:"|')(${COLOR_NAME_PATTERN})(?:"|')>([\\s\\S]*?)<\\/color>`,
  'gi'
);
export const COLOR_TAG_MARKUP_PATTERN = new RegExp(
  `<color\\s+fg=(?:"|')(?:${COLOR_NAME_PATTERN})(?:"|')>|<\\/color>`,
  'gi'
);

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

const ANSI_RESET = '\x1b[37m';

export function stripColorTags(content: string): string {
  return content.replace(COLOR_TAG_MARKUP_PATTERN, '');
}

export function renderInlineColors(content: string): string {
  return content.replace(COLOR_TAG_PATTERN, (_, colorName: string, innerText: string) => {
    const color = ANSI_COLORS[colorName];

    if (!color) {
      return innerText;
    }

    return `${color}${innerText}${ANSI_RESET}`;
  });
}
