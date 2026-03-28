import {Box, Text, useApp, useInput, useStdout} from 'ink';
import {access} from 'node:fs/promises';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {centerTextBlock, composeTwoScreenLayout} from './layout.js';
import {ensureQrImage, ExternalMediaViewer, resolveDeckImagePath} from './externalQr.js';
import {countRevealLines} from './revealLines.js';
import {slideDefaultAlign} from './slideAlign.js';
import type {QuestionState, Slide} from './types.js';
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
      const imagePath = resolveDeckImagePath(deckDirectory, currentSlide.imagePath);

      void access(imagePath)
        .then(() => {
          if (!cancelled) {
            setMediaError(undefined);
            viewer.open(imagePath, {
              align: 'center',
              widthPercent: currentSlide.imageWidthPercent,
              backgroundColor: currentSlide.imageBackgroundColor,
              panePosition: 'left',
              screens:
                currentSlide.screens && currentSlide.screens.length === 2
                  ? [currentSlide.screens[0], currentSlide.screens[1]]
                  : undefined
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
    currentSlide?.qrText,
    currentSlide?.qrColors,
    currentSlide?.qrWidthPercent,
    deckDirectory,
    mediaVersion
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

  const visibleTextFrame = frame;
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
          ? composeTwoScreenLayout(currentSlide.asciiArt, visibleTextFrame, {
              rows,
              columns,
              headerContent: isTransitioning ? displayHeader : renderedHeader,
              footerContent: isTransitioning ? displayFootnote : renderedFootnote,
              screens: [
                {widthPercent: 40, contentAlign: 'center'},
              {widthPercent: 60, contentAlign: isTransitioning ? displayAlign : effectiveAlign}
            ]
          })
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
  const displayedFrame = isTransitioning ? frameWithScreens : addCursor(frameWithScreens, blinkVisible, columns);

  return (
    <Box width="100%" height="100%">
      <Text>{displayedFrame}</Text>
    </Box>
  );
}
