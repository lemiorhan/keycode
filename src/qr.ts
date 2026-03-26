import QRCode from 'qrcode';

interface RenderTerminalQrOptions {
  maxColumns: number;
  maxRows: number;
}

export interface TerminalQrRender {
  output: string;
  width: number;
  height: number;
}

const QUIET_ZONE_LEVELS = [4, 2, 1, 0];

function moduleAt(modules: QRCode.QRCode['modules'], row: number, column: number): boolean {
  return modules.get(row, column) === 1;
}

function renderMatrix(
  modules: QRCode.QRCode['modules'],
  quietZone: number
): TerminalQrRender {
  const size = modules.size;
  const totalSize = size + quietZone * 2;
  const lines: string[] = [];

  for (let row = 0; row < totalSize; row += 2) {
    let line = '';

    for (let column = 0; column < totalSize; column += 1) {
      const topRow = row - quietZone;
      const bottomRow = row + 1 - quietZone;
      const moduleColumn = column - quietZone;
      const top = topRow >= 0 && topRow < size && moduleColumn >= 0 && moduleColumn < size
        ? moduleAt(modules, topRow, moduleColumn)
        : false;
      const bottom = bottomRow >= 0 && bottomRow < size && moduleColumn >= 0 && moduleColumn < size
        ? moduleAt(modules, bottomRow, moduleColumn)
        : false;

      if (top && bottom) {
        line += '█';
      } else if (top) {
        line += '▀';
      } else if (bottom) {
        line += '▄';
      } else {
        line += ' ';
      }
    }

    lines.push(line);
  }

  return {
    output: lines.join('\n'),
    width: totalSize,
    height: lines.length
  };
}

export function renderTerminalQr(
  value: string,
  options: RenderTerminalQrOptions
): TerminalQrRender {
  const qr = QRCode.create(value, {
    errorCorrectionLevel: 'L'
  });

  for (const quietZone of QUIET_ZONE_LEVELS) {
    const rendered = renderMatrix(qr.modules, quietZone);

    if (rendered.width <= options.maxColumns && rendered.height <= options.maxRows) {
      return rendered;
    }
  }

  const fallback = '[QR too large]';

  return {
    output: fallback,
    width: fallback.length,
    height: 1
  };
}
