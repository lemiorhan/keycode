import {Box, Text, useApp, useInput, useStdout} from 'ink';
import {access} from 'node:fs/promises';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {centerTextBlock, composeTwoScreenLayout} from './layout.js';
import {ensureQrImage, ExternalMediaViewer, resolveDeckImagePath} from './externalQr.js';
import {slideDefaultAlign} from './slideAlign.js';
import type {QuestionState, Slide} from './types.js';
import {renderSlideFootnote, renderSlideTextContent} from './renderSlide.js';
import {buildTransitionFrames} from './transition.js';
import {shouldSkipTransition} from './transitionPolicy.js';
import {useBlinkCursor} from './useBlink.js';
import {useQuestionInput} from './useQuestionInput.js';

interface PresentationAppProps {
  slides: Slide[];
  deckDirectory: string;
}

const TRANSITION_MS = 34;
const NORMAL_TRANSITION_STEPS = 10;
const COMPACT_TRANSITION_STEPS = 4;

function addCursor(content: string, cursorVisible: boolean): string {
  const cursor = cursorVisible ? '█' : ' ';
  return `${content}${cursor}`;
}

export function PresentationApp({slides, deckDirectory}: PresentationAppProps): React.JSX.Element {
  const {exit} = useApp();
  const {stdout} = useStdout();
  const [slideIndex, setSlideIndex] = useState(0);
  const [frame, setFrame] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [displayAlign, setDisplayAlign] = useState(() => slideDefaultAlign(slides[0]));
  const [displayFootnote, setDisplayFootnote] = useState<string | undefined>(undefined);
  const [mediaError, setMediaError] = useState<string | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<number, QuestionState>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const externalMediaViewerRef = useRef(new ExternalMediaViewer());
  const questionLocked = slides[slideIndex]?.hasQuestion && !answers[slideIndex];
  const blinkVisible = useBlinkCursor();
  const currentSlide = slides[slideIndex];
  const rows = stdout.rows ?? process.stdout.rows ?? 24;
  const columns = stdout.columns ?? process.stdout.columns ?? 80;

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
      mediaError
    });
  }, [answers, currentSlide, mediaError, questionInput, slideIndex]);

  const renderedFootnote = useMemo(() => {
    if (!currentSlide) {
      return undefined;
    }

    return renderSlideFootnote(currentSlide);
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
  }, [columns, currentSlide, effectiveAlign, renderedFootnote, renderedTextContent, rows]);

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
    deckDirectory
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

    if ((key.rightArrow || key.downArrow) && slideIndex < slides.length - 1) {
      setSlideIndex((current) => current + 1);
      return;
    }

    if ((key.leftArrow || key.upArrow) && slideIndex > 0) {
      setSlideIndex((current) => current - 1);
    }
  });

  const visibleTextFrame = isTransitioning ? frame : addCursor(frame, blinkVisible);
  const finalFrame = centerTextBlock(visibleTextFrame, {
    rows,
    columns,
    align: isTransitioning ? displayAlign : effectiveAlign,
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
          footerContent: isTransitioning ? displayFootnote : renderedFootnote,
          screens
        })
      : currentSlide?.asciiArt
        ? composeTwoScreenLayout(currentSlide.asciiArt, visibleTextFrame, {
            rows,
            columns,
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
                footerContent: isTransitioning ? displayFootnote : renderedFootnote,
                screens
              }
            )
          : finalFrame;

  return (
    <Box width="100%" height="100%">
      <Text>{frameWithScreens}</Text>
    </Box>
  );
}
