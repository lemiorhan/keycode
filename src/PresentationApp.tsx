import {Box, Text, useApp, useInput, useStdout} from 'ink';
import {access} from 'node:fs/promises';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {centerStackedSections, centerTextBlock, composeTwoScreenLayout} from './layout.js';
import {
  ensureQrImage,
  ExternalMediaViewer,
  readImageSize,
  resolveDeckImagePath
} from './externalQr.js';
import {IMAGE_ANCHOR_TOKEN} from './imageTag.js';
import {countRevealLines} from './revealLines.js';
import {slideDefaultAlign} from './slideAlign.js';
import type {QuestionState, Slide, SlideScreen} from './types.js';
import {renderSlideFootnote, renderSlideHeader, renderSlideTextContent} from './renderSlide.js';
import {buildTransitionFrames} from './transition.js';
import {shouldSkipTransition} from './transitionPolicy.js';
import {useBlinkCursor} from './useBlink.js';
import {useQuestionInput} from './useQuestionInput.js';
import stringWidth from 'string-width';

interface PresentationAppProps {
  slides: Slide[];
  deckDirectory: string;
  mediaVersion?: number;
  statusMessage?: string;
}

const TRANSITION_MS = 34;
const NORMAL_TRANSITION_STEPS = 10;
const COMPACT_TRANSITION_STEPS = 4;

const ANSI_PATTERN = /\x1B\[[0-9;]*m/g;

function visibleWidth(line: string): number {
  return stringWidth(line.replace(ANSI_PATTERN, ''));
}

function extractImageAnchor(frame: string): {
  frame: string;
  anchor?: {row: number; column: number};
} {
  if (!frame.includes(IMAGE_ANCHOR_TOKEN)) {
    return {frame};
  }

  const lines = frame.split('\n');
  let anchor: {row: number; column: number} | undefined;

  const sanitizedLines = lines.map((line, row) => {
    const tokenIndex = line.indexOf(IMAGE_ANCHOR_TOKEN);

    if (tokenIndex === -1) {
      return line;
    }

    if (!anchor) {
      anchor = {
        row,
        column: visibleWidth(line.slice(0, tokenIndex))
      };
    }

    return line.replace(IMAGE_ANCHOR_TOKEN, '');
  });

  return {
    frame: sanitizedLines.join('\n'),
    anchor
  };
}

function reserveInlineImageSpace(content: string, spacerRows: number): string {
  if (!content.includes(IMAGE_ANCHOR_TOKEN) || spacerRows <= 1) {
    return content;
  }

  const topRows = Math.floor((spacerRows - 1) / 2);
  const bottomRows = spacerRows - 1 - topRows;
  const replacement = `${'\n'.repeat(topRows)}${IMAGE_ANCHOR_TOKEN}${'\n'.repeat(bottomRows)}`;
  return content.replace(IMAGE_ANCHOR_TOKEN, replacement);
}

function addCursor(content: string, cursorVisible: boolean, columns: number): string {
  const cursor = cursorVisible ? '█' : ' ';
  const lines = content.split('\n');

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index] ?? '';

    if (line.trim().length === 0) {
      continue;
    }

    const trimmedLine = line.replace(/[ \t]+$/u, '');
    lines[index] =
      visibleWidth(trimmedLine) >= columns ? trimmedLine : `${trimmedLine}${cursor}`;
    return lines.join('\n');
  }

  return cursor;
}

const STATUS_COLOR = '\x1b[90m';
const ANSI_RESET = '\x1b[39m';

export function PresentationApp({
  slides,
  deckDirectory,
  mediaVersion = 0,
  statusMessage
}: PresentationAppProps): React.JSX.Element {
  const {exit} = useApp();
  const {stdout} = useStdout();
  const [slideIndex, setSlideIndex] = useState(0);
  const [frame, setFrame] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [displayAlign, setDisplayAlign] = useState(() => slideDefaultAlign(slides[0]));
  const [displayHeader, setDisplayHeader] = useState<string | undefined>(() =>
    slides[0] ? renderSlideHeader(slides[0]) : undefined
  );
  const [displayFootnote, setDisplayFootnote] = useState<string | undefined>(undefined);
  const [mediaError, setMediaError] = useState<string | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<number, QuestionState>>({});
  const [revealCounts, setRevealCounts] = useState<Record<number, number>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const externalMediaViewerRef = useRef(new ExternalMediaViewer());
  const questionLocked = slides[slideIndex]?.hasQuestion && !answers[slideIndex];
  const blinkVisible = useBlinkCursor();
  const currentSlide = slides[slideIndex];
  const currentRevealCount = revealCounts[slideIndex] ?? 0;
  const rows = stdout.rows ?? process.stdout.rows ?? 24;
  const columns = stdout.columns ?? process.stdout.columns ?? 80;

  const totalRevealLines = (slide?: Slide): number => countRevealLines(slide?.body ?? '');

  useEffect(() => {
    stdout.write('\x1B[?25l');

    return () => {
      stdout.write('\x1B[?25h');
    };
  }, [stdout]);

  useEffect(() => {
    if (slides.length === 0) {
      return;
    }

    setSlideIndex((current) => Math.min(current, slides.length - 1));
  }, [slides]);

  const questionInput = useQuestionInput({
    enabled: Boolean(questionLocked),
    initialValue: answers[slideIndex]?.answer ?? '',
    onSubmit: (value) => {
      if (!currentSlide?.hasQuestion) {
        return;
      }

      setAnswers((current) => ({
        ...current,
        [slideIndex]: {
          slideIndex,
          answer: value
        }
      }));
    }
  });

  const renderedTextContent = useMemo(() => {
    if (!currentSlide) {
      return 'No slides found.';
    }

    return renderSlideTextContent({
      slide: currentSlide,
      answer: answers[slideIndex],
      questionInput,
      mediaError,
      revealCount: currentRevealCount
    });
  }, [answers, currentRevealCount, currentSlide, mediaError, questionInput, slideIndex]);

  const renderedFootnote = useMemo(() => {
    if (!currentSlide) {
      return undefined;
    }

    const sections = [renderSlideFootnote(currentSlide)];

    if (statusMessage) {
      sections.push(`${STATUS_COLOR}${statusMessage}${ANSI_RESET}`);
    }

    return sections.filter(Boolean).join('\n');
  }, [currentSlide, statusMessage]);

  const renderedHeader = useMemo(() => {
    if (!currentSlide) {
      return undefined;
    }

    return renderSlideHeader(currentSlide);
  }, [currentSlide]);

  const effectiveAlign = slideDefaultAlign(currentSlide);
  const inlineImageSpacerRows = useMemo(() => {
    if (!currentSlide?.imagePath || (currentSlide.screens && currentSlide.screens.length === 2)) {
      return 0;
    }

    const imagePath = resolveDeckImagePath(deckDirectory, currentSlide.imagePath);
    const imageSize = readImageSize(imagePath);

    if (!imageSize) {
      return 6;
    }

    const widthPercent = currentSlide.imageWidthPercent ?? 30;
    const estimatedRows = Math.round(
      rows * (widthPercent / 100) * (imageSize.height / Math.max(imageSize.width, 1))
    );

    return Math.min(Math.max(estimatedRows + 1, 4), Math.max(Math.floor(rows / 2), 4));
  }, [
    currentSlide?.imagePath,
    currentSlide?.imageWidthPercent,
    currentSlide?.screens,
    deckDirectory,
    rows
  ]);
  const visibleTextFrame = reserveInlineImageSpace(frame, inlineImageSpacerRows);
  const finalFrame = centerTextBlock(visibleTextFrame, {
    rows,
    columns,
    align: isTransitioning ? displayAlign : effectiveAlign,
    headerContent: isTransitioning ? displayHeader : renderedHeader,
    footerContent: isTransitioning ? displayFootnote : renderedFootnote
  });
  const screens =
    currentSlide?.screens && currentSlide.screens.length === 2
      ? (currentSlide.screens as [typeof currentSlide.screens[0], typeof currentSlide.screens[1]])
      : undefined;
  const frameWithScreens =
    currentSlide?.asciiArt && screens
        ? composeTwoScreenLayout(currentSlide.asciiArt, visibleTextFrame, {
            rows,
            columns,
            headerContent: isTransitioning ? displayHeader : renderedHeader,
            footerContent: isTransitioning ? displayFootnote : renderedFootnote,
            screens
          })
        : currentSlide?.asciiArt
          ? centerStackedSections(
              [currentSlide.asciiArt, visibleTextFrame],
              {
                rows,
                columns,
                align: 'center',
                headerContent: isTransitioning ? displayHeader : renderedHeader,
                footerContent: isTransitioning ? displayFootnote : renderedFootnote,
                sectionGap: 1
              }
            )
          : currentSlide?.imagePath && screens
            ? composeTwoScreenLayout(
                '',
                visibleTextFrame,
                {
                  rows,
                  columns,
                  headerContent: isTransitioning ? displayHeader : renderedHeader,
                  footerContent: isTransitioning ? displayFootnote : renderedFootnote,
                  screens
                }
              )
            : finalFrame;
  const {frame: anchoredFrame, anchor: inlineImageAnchor} = useMemo(
    () => extractImageAnchor(frameWithScreens),
    [frameWithScreens]
  );
  const displayedFrame = isTransitioning ? anchoredFrame : addCursor(anchoredFrame, blinkVisible, columns);

  useEffect(() => {
    if (!currentSlide) {
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const skipTransition = shouldSkipTransition(currentSlide, renderedTextContent);

    if (skipTransition) {
      setDisplayAlign(effectiveAlign);
      setDisplayHeader(renderedHeader);
      setDisplayFootnote(renderedFootnote);
      setFrame(renderedTextContent);
      setIsTransitioning(false);
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    const steps = columns < 60 || rows < 16 ? COMPACT_TRANSITION_STEPS : NORMAL_TRANSITION_STEPS;
    const frames = buildTransitionFrames(renderedTextContent, steps);
    let currentStep = -1;
    setIsTransitioning(true);

    timerRef.current = setInterval(() => {
      currentStep += 1;

      if (currentStep >= frames.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        setDisplayAlign(effectiveAlign);
        setDisplayHeader(renderedHeader);
        setDisplayFootnote(renderedFootnote);
        setFrame(renderedTextContent);
        setIsTransitioning(false);
        return;
      }

      setFrame(frames[currentStep]?.output ?? renderedTextContent);
    }, TRANSITION_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [columns, currentSlide, effectiveAlign, renderedFootnote, renderedHeader, renderedTextContent, rows]);

  useEffect(() => {
    const viewer = externalMediaViewerRef.current;

    if (!currentSlide?.imagePath && !currentSlide?.qrText) {
      setMediaError(undefined);
      viewer.close();
      return;
    }

    let cancelled = false;

    if (currentSlide?.imagePath) {
      const hasScreens = Boolean(currentSlide.screens && currentSlide.screens.length === 2);
      const screenPair = hasScreens
        ? ([currentSlide.screens![0], currentSlide.screens![1]] as [SlideScreen, SlideScreen])
        : undefined;

      const imagePath = resolveDeckImagePath(deckDirectory, currentSlide.imagePath);

      void access(imagePath)
        .then(() => {
          if (!cancelled) {
            setMediaError(undefined);
            viewer.open(imagePath, {
              widthPercent: currentSlide.imageWidthPercent,
              backgroundColor: currentSlide.imageBackgroundColor,
              ...(hasScreens
                ? {
                    align: 'center' as const,
                    panePosition: 'left' as const,
                    screens: screenPair
                  }
                : {
                    anchorRow: Math.max((inlineImageAnchor?.row ?? Math.floor(rows / 2)) - 2, 0),
                    anchorColumn: Math.floor(columns / 2),
                    terminalRows: rows,
                    terminalColumns: columns
                  })
            });
          }
        })
        .catch(() => {
          if (!cancelled) {
            setMediaError(`[image not found: ${currentSlide.imagePath}]`);
            viewer.close();
          }
        });
    } else if (currentSlide?.qrText) {
      setMediaError(undefined);
      void ensureQrImage(deckDirectory, currentSlide.qrText, currentSlide.qrColors)
        .then((imagePath) => {
          if (!cancelled) {
            viewer.open(imagePath, {
              position: 'right',
              align: 'bottom',
              widthPercent: currentSlide.qrWidthPercent,
              intrinsicWidth: 1,
              intrinsicHeight: 1
            });
          }
        })
        .catch(() => {
          if (!cancelled) {
            viewer.close();
          }
        });
    }

    return () => {
      cancelled = true;
      viewer.close();
    };
  }, [
    currentSlide?.imagePath,
    currentSlide?.imageWidthPercent,
    currentSlide?.imageBackgroundColor,
    currentSlide?.screens,
    inlineImageAnchor?.row,
    currentSlide?.qrText,
    currentSlide?.qrColors,
    currentSlide?.qrWidthPercent,
    deckDirectory,
    mediaVersion,
    rows,
    columns
  ]);

  useEffect(() => {
    const viewer = externalMediaViewerRef.current;

    return () => {
      viewer.close();
    };
  }, []);

  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      exit();
      return;
    }

    if (input === 'q') {
      exit();
      return;
    }

    if (questionLocked) {
      return;
    }

    if (key.rightArrow || key.downArrow) {
      const currentTotalRevealLines = totalRevealLines(currentSlide);

      if (currentRevealCount < currentTotalRevealLines) {
        setRevealCounts((current) => ({
          ...current,
          [slideIndex]: currentRevealCount + 1
        }));
        return;
      }

      if (slideIndex < slides.length - 1) {
        setSlideIndex((current) => current + 1);
      }
      return;
    }

    if (key.leftArrow || key.upArrow) {
      if (currentRevealCount > 0) {
        setRevealCounts((current) => ({
          ...current,
          [slideIndex]: currentRevealCount - 1
        }));
        return;
      }

      if (slideIndex > 0) {
        const previousSlideIndex = slideIndex - 1;
        const previousSlide = slides[previousSlideIndex];

        setRevealCounts((current) => ({
          ...current,
          [previousSlideIndex]: totalRevealLines(previousSlide)
        }));
        setSlideIndex(previousSlideIndex);
      }
    }
  });

  return (
    <Box width="100%" height="100%">
      <Text>{displayedFrame}</Text>
    </Box>
  );
}
