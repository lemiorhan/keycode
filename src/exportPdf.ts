import PDFDocument from 'pdfkit';
import {createWriteStream} from 'node:fs';
import {basename, join} from 'node:path';
import type {Slide, SlideAlign, SlideScreen} from './types.js';
import {readDeckDirectory} from './file.js';
import {parseSlides} from './parser.js';
import {renderSlideTextContent, renderSlideHeader, renderSlideFootnote} from './renderSlide.js';
import {centerTextBlock, centerStackedSections, composeTwoScreenLayout} from './layout.js';
import {slideDefaultAlign} from './slideAlign.js';
import {IMAGE_ANCHOR_TOKEN} from './imageTag.js';
import {resolveDeckImagePath, readImageSize, ensureQrImage} from './externalQr.js';
import {resolveActiveSlideNumber} from './slideNumber.js';
import {
  PAGE_WIDTH,
  PAGE_HEIGHT,
  registerFont,
  fillPageBackground,
  renderFrameToPdfPage,
  computeGridGeometry,
  embedImageOnPage
} from './pdfRenderer.js';

const REVEAL_SINGLE = /^(\s*)(?<!=)=>(?:\s?)(.*)/;
const REVEAL_GROUP = /^(\s*)==>(?:\s?)(.*)/;

function stripRevealMarkers(body: string): string {
  return body
    .split('\n')
    .map((line) => {
      const groupMatch = line.match(REVEAL_GROUP);

      if (groupMatch) {
        return `${groupMatch[1]}${groupMatch[2]}`;
      }

      const singleMatch = line.match(REVEAL_SINGLE);

      if (singleMatch) {
        return `${singleMatch[1]}${singleMatch[2]}`;
      }

      return line;
    })
    .join('\n');
}

function stripImageAnchor(content: string): string {
  return content
    .replace(IMAGE_ANCHOR_TOKEN, '')
    .replace(/\n{3,}/g, '\n\n');
}

function renderSlideFrameForPdf(
  slides: Slide[],
  slideIndex: number,
  rows: number,
  columns: number,
  verticalAlign?: 'top' | 'center',
  skipHeader?: boolean,
  skipFootnote?: boolean
): string {
  const slide = slides[slideIndex];

  if (!slide) {
    return '';
  }

  const pdfSlide = {...slide, body: stripRevealMarkers(slide.body)};
  const rawTextContent = renderSlideTextContent({slide: pdfSlide});
  const textContent = stripImageAnchor(rawTextContent);

  const header = skipHeader ? undefined : renderSlideHeader(slide);
  const footnote = skipFootnote ? undefined : renderSlideFootnote(slide);
  const align = slideDefaultAlign(slide);

  const activeSlideNumber = resolveActiveSlideNumber(slides, slideIndex);
  const topOverlayLine = activeSlideNumber?.vAlign === 'top' ? activeSlideNumber.value : undefined;
  const bottomOverlayLine = activeSlideNumber?.vAlign === 'bottom' ? activeSlideNumber.value : undefined;
  const topOverlayAlign: SlideAlign | undefined = activeSlideNumber?.vAlign === 'top' ? activeSlideNumber.hAlign : undefined;
  const bottomOverlayAlign: SlideAlign | undefined = activeSlideNumber?.vAlign === 'bottom' ? activeSlideNumber.hAlign : undefined;

  const screens =
    slide.screens && slide.screens.length === 2
      ? (slide.screens as [SlideScreen, SlideScreen])
      : undefined;

  if (slide.asciiArt && screens) {
    return composeTwoScreenLayout(slide.asciiArt, textContent, {
      rows,
      columns,
      headerContent: header,
      footerContent: footnote,
      topOverlayLine,
      topOverlayAlign,
      bottomOverlayLine,
      bottomOverlayAlign,
      screens
    });
  }

  if (slide.asciiArt) {
    return centerStackedSections([slide.asciiArt, textContent], {
      rows,
      columns,
      align: 'center',
      headerContent: header,
      footerContent: footnote,
      topOverlayLine,
      topOverlayAlign,
      bottomOverlayLine,
      bottomOverlayAlign,
      sectionGap: 1
    });
  }

  if (slide.imagePath && screens) {
    return composeTwoScreenLayout('', textContent, {
      rows,
      columns,
      headerContent: header,
      footerContent: footnote,
      topOverlayLine,
      topOverlayAlign,
      bottomOverlayLine,
      bottomOverlayAlign,
      screens
    });
  }

  return centerTextBlock(textContent, {
    rows,
    columns,
    align,
    headerContent: header,
    footerContent: footnote,
    topOverlayLine,
    topOverlayAlign,
    bottomOverlayLine,
    bottomOverlayAlign,
    forcePerLineCenter: !!slide.titleText,
    verticalAlign
  });
}

const ANSI_PATTERN = /\x1B\[[0-9;]*m/g;

function measureTextHeight(frame: string): number {
  const lines = frame.split('\n');
  let lastNonEmpty = 0;

  for (let r = 0; r < lines.length; r++) {
    const stripped = lines[r].replace(ANSI_PATTERN, '').trim();

    if (stripped.length > 0) {
      lastNonEmpty = r + 1;
    }
  }

  return lastNonEmpty;
}

interface ExportPdfOptions {
  zoom?: number;
  rows?: number;
  columns?: number;
  outputPath?: string;
}

export async function exportDeckToPdf(
  deckDirectory: string,
  options: ExportPdfOptions = {}
): Promise<string> {
  const zoom = options.zoom ?? 1.0;
  const rows = options.rows ?? 40;
  const columns = options.columns ?? 120;
  const deckName = basename(deckDirectory);
  const outputPath = options.outputPath ?? join(process.cwd(), `${deckName}.pdf`);

  const {source} = await readDeckDirectory(deckDirectory);
  const deck = parseSlides(source);

  if (deck.slides.length === 0) {
    throw new Error(`No slides found in deck: ${deckDirectory}`);
  }

  const doc = new PDFDocument({
    size: [PAGE_WIDTH, PAGE_HEIGHT],
    margin: 0,
    autoFirstPage: false
  });

  const stream = createWriteStream(outputPath);
  doc.pipe(stream);

  const {fontName, charWidthRatio} = registerFont(doc);
  const margin = 40;
  const gap = 20;

  for (let i = 0; i < deck.slides.length; i++) {
    const slide = deck.slides[i];
    const hasScreens = slide.screens && slide.screens.length === 2;

    doc.addPage({size: [PAGE_WIDTH, PAGE_HEIGHT], margin: 0});
    fillPageBackground(doc);

    if (slide.imagePath && !hasScreens) {
      const resolved = resolveDeckImagePath(deckDirectory, slide.imagePath);
      const imageSize = readImageSize(resolved);

      if (imageSize) {
        const widthPercent = slide.imageWidthPercent ?? 30;
        const bodyText = slide.body.replace(IMAGE_ANCHOR_TOKEN, '').trim();
        const isImageOnly = bodyText.length === 0 && !slide.titleText && !slide.headerText;
        const aspectRatio = imageSize.height / Math.max(imageSize.width, 1);

        if (isImageOnly) {
          // Center image on full page, render text normally (slide number etc.)
          const imgWidth = Math.min(PAGE_WIDTH * (widthPercent / 100), PAGE_WIDTH - 2 * margin);
          const imgHeight = Math.min(imgWidth * aspectRatio, PAGE_HEIGHT - 2 * margin);
          const x = (PAGE_WIDTH - imgWidth) / 2;
          const y = (PAGE_HEIGHT - imgHeight) / 2;
          embedImageOnPage(doc, resolved, {x, y, width: imgWidth, height: imgHeight});
          const frame = renderSlideFrameForPdf(deck.slides, i, rows, columns);
          renderFrameToPdfPage(doc, frame, {zoom, rows, columns, fontName, charWidthRatio});
        } else {
          // Layout: header (top) → [image + text centered] → footnote (bottom)
          const geo = computeGridGeometry(rows, columns, zoom, charWidthRatio);

          // 1. Header at top
          const header = renderSlideHeader(slide);
          let topY = margin;

          if (header) {
            const headerLines = header.split('\n').length;
            const headerRows = headerLines + 2;
            const headerGeo = computeGridGeometry(headerRows, columns, zoom, charWidthRatio);
            const headerFrame = centerTextBlock(header, {
              rows: headerRows,
              columns,
              align: 'center',
              verticalAlign: 'top'
            });
            renderFrameToPdfPage(doc, headerFrame, {
              zoom, rows: headerRows, columns, fontName, charWidthRatio,
              offsetY: topY - headerGeo.marginTop
            });
            topY += headerLines * geo.cellHeight + gap;
          }

          // 2. Footnote + slide number at bottom
          const footnote = renderSlideFootnote(slide);
          let bottomY = PAGE_HEIGHT - margin;

          if (footnote) {
            const footnoteLines = footnote.split('\n').length;
            const footnoteRows = footnoteLines + 1;
            const footnoteGeo = computeGridGeometry(footnoteRows, columns, zoom, charWidthRatio);
            const footnoteFrame = centerTextBlock(footnote, {
              rows: footnoteRows,
              columns,
              align: 'left',
              verticalAlign: 'top'
            });
            bottomY -= footnoteLines * geo.cellHeight;
            renderFrameToPdfPage(doc, footnoteFrame, {
              zoom, rows: footnoteRows, columns, fontName, charWidthRatio,
              offsetY: bottomY - footnoteGeo.marginTop
            });
            bottomY -= gap;
          }

          // Render slide number overlay at the very bottom
          const activeSlideNumber = resolveActiveSlideNumber(deck.slides, i);
          if (activeSlideNumber?.vAlign === 'bottom') {
            const snFrame = centerTextBlock(activeSlideNumber.value, {
              rows: 1,
              columns,
              align: activeSlideNumber.hAlign ?? 'center',
              verticalAlign: 'top'
            });
            const snGeo = computeGridGeometry(1, columns, zoom, charWidthRatio);
            renderFrameToPdfPage(doc, snFrame, {
              zoom, rows: 1, columns, fontName, charWidthRatio,
              offsetY: (PAGE_HEIGHT - margin - geo.cellHeight) - snGeo.marginTop
            });
          }

          // 3. Center image + body text in the space between header and footnote
          const maxImgHeight = (bottomY - topY) * 0.55;
          const imgWidth = Math.min(PAGE_WIDTH * (widthPercent / 100), PAGE_WIDTH - 2 * margin);
          const imgHeight = Math.min(imgWidth * aspectRatio, maxImgHeight);

          // Render body only (no header, no footnote) top-aligned to measure height
          const frame = renderSlideFrameForPdf(deck.slides, i, rows, columns, 'top', true, true);
          const textRowCount = measureTextHeight(frame);
          const textHeightPx = textRowCount * geo.cellHeight;

          const contentHeight = imgHeight + gap + textHeightPx;
          const availableHeight = bottomY - topY;
          const contentTop = topY + Math.max((availableHeight - contentHeight) / 2, 0);

          // Place image centered horizontally
          const imgX = (PAGE_WIDTH - imgWidth) / 2;
          embedImageOnPage(doc, resolved, {x: imgX, y: contentTop, width: imgWidth, height: imgHeight});

          // Place body text right below image
          const textTop = contentTop + imgHeight + gap;
          const textOffsetY = textTop - geo.marginTop;
          renderFrameToPdfPage(doc, frame, {
            zoom, rows, columns, fontName, charWidthRatio,
            offsetY: textOffsetY
          });
        }
      } else {
        // Image file unreadable, render text normally
        const frame = renderSlideFrameForPdf(deck.slides, i, rows, columns);
        renderFrameToPdfPage(doc, frame, {zoom, rows, columns, fontName, charWidthRatio});
      }
    } else if (!hasScreens) {
      // No image, no screens — normal text slide
      const frame = renderSlideFrameForPdf(deck.slides, i, rows, columns);
      renderFrameToPdfPage(doc, frame, {zoom, rows, columns, fontName, charWidthRatio});
    } else {
      // Two-screen layout — render text normally (image handled below)
      const frame = renderSlideFrameForPdf(deck.slides, i, rows, columns);
      renderFrameToPdfPage(doc, frame, {zoom, rows, columns, fontName, charWidthRatio});
    }

    // Two-screen image: image in left pane
    if (slide.imagePath && hasScreens) {
      const resolved = resolveDeckImagePath(deckDirectory, slide.imagePath);
      const imageSize = readImageSize(resolved);

      if (imageSize) {
        const widthPercent = slide.imageWidthPercent ?? 30;
        const aspectRatio = imageSize.height / Math.max(imageSize.width, 1);
        const leftScreenWidth = slide.screens![0].widthPercent ?? 50;
        const paneWidth = PAGE_WIDTH * (leftScreenWidth / 100);
        const imgWidth = Math.min(paneWidth - 2 * margin, PAGE_WIDTH * (widthPercent / 100));
        const imgHeight = Math.min(imgWidth * aspectRatio, PAGE_HEIGHT - 2 * margin);
        const x = (paneWidth - imgWidth) / 2;
        const y = (PAGE_HEIGHT - imgHeight) / 2;
        embedImageOnPage(doc, resolved, {x, y, width: imgWidth, height: imgHeight});
      }
    }

    if (slide.qrText) {
      try {
        const qrImagePath = await ensureQrImage(
          deckDirectory,
          slide.qrText,
          slide.qrColors
        );
        const qrSize = readImageSize(qrImagePath);

        if (qrSize) {
          const qrWidthPercent = slide.qrWidthPercent ?? 20;
          const imgWidth = PAGE_WIDTH * (qrWidthPercent / 100);
          const imgHeight = imgWidth;
          const x = PAGE_WIDTH - imgWidth - margin;
          const y = PAGE_HEIGHT - imgHeight - margin;
          embedImageOnPage(doc, qrImagePath, {x, y, width: imgWidth, height: imgHeight});
        }
      } catch {
        // QR generation failed; skip embedding
      }
    }
  }

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  return outputPath;
}
