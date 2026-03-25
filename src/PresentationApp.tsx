import {Box, Text, useApp, useInput, useStdout} from 'ink';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {renderImageAscii} from './imageAscii.js';
import {centerTextBlock, composeImageLeftLayout} from './layout.js';
import type {QuestionState, Slide} from './types.js';
import {renderSlideContent, renderSlideTextContent} from './renderSlide.js';
import {buildTransitionFrames} from './transition.js';
import {useBlinkCursor} from './useBlink.js';
import {useQuestionInput} from './useQuestionInput.js';

interface PresentationAppProps {
  deckDir: string;
  slides: Slide[];
}

const TRANSITION_MS = 34;
const NORMAL_TRANSITION_STEPS = 10;
const COMPACT_TRANSITION_STEPS = 4;

function buildHintLine(slideIndex: number, slideCount: number, locked: boolean): string {
  const prev = slideIndex > 0 ? '←/↑ prev' : '        ';
  const next = slideIndex < slideCount - 1 ? '→/↓ next' : '        ';
  const middle = locked ? 'type and press Enter' : `${slideIndex + 1}/${slideCount}`;
  return `${prev}   ${middle}   ${next}   q quit`;
}

function addCursor(content: string, cursorVisible: boolean): string {
  const cursor = cursorVisible ? '█' : ' ';
  return `${content}${cursor}`;
}

export function PresentationApp({deckDir, slides}: PresentationAppProps): React.JSX.Element {
  const {exit} = useApp();
  const {stdout} = useStdout();
  const [slideIndex, setSlideIndex] = useState(0);
  const [frame, setFrame] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [answers, setAnswers] = useState<Record<number, QuestionState>>({});
  const [imageAscii, setImageAscii] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
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

  useEffect(() => {
    let cancelled = false;

    if (!currentSlide?.imageSource) {
      setImageAscii('');
      return () => {
        cancelled = true;
      };
    }

    const imageWidth = Math.max(Math.min(columns - 8, 90), 24);
    renderImageAscii(currentSlide.imageSource, {
      cwd: deckDir,
      maxColumns: imageWidth
    })
      .then((ascii) => {
        if (!cancelled) {
          setImageAscii(ascii);
        }
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);

        if (!cancelled) {
          setImageAscii(`[image failed: ${message}]`);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [columns, currentSlide, deckDir]);

  const renderedContent = useMemo(() => {
    if (!currentSlide) {
      return 'No slides found.';
    }

    return renderSlideContent({
      slide: currentSlide,
      answer: answers[slideIndex],
      questionInput,
      imageAscii
    });
  }, [answers, currentSlide, imageAscii, questionInput, slideIndex]);

  useEffect(() => {
    if (!currentSlide) {
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const shouldSkipTransition = Boolean(currentSlide.imageSource) || renderedContent.includes('\x1b[');

    if (shouldSkipTransition) {
      setFrame(renderedContent);
      setIsTransitioning(false);
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    const steps = columns < 60 || rows < 16 ? COMPACT_TRANSITION_STEPS : NORMAL_TRANSITION_STEPS;
    const frames = buildTransitionFrames(renderedContent, steps);
    let currentStep = 0;
    setIsTransitioning(true);
    setFrame(frames[0]?.output ?? renderedContent);

    timerRef.current = setInterval(() => {
      currentStep += 1;

      if (currentStep >= frames.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        setFrame(renderedContent);
        setIsTransitioning(false);
        return;
      }

      setFrame(frames[currentStep]?.output ?? renderedContent);
    }, TRANSITION_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [columns, currentSlide, renderedContent, rows]);

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

  const hintLine = buildHintLine(slideIndex, slides.length, Boolean(questionLocked));
  const finalFrame = useMemo(() => {
    if (!currentSlide) {
      return '';
    }

    if (currentSlide.imageSource && imageAscii) {
      const textContent = renderSlideTextContent({
        slide: currentSlide,
        answer: answers[slideIndex],
        questionInput
      });
      const visibleText = isTransitioning ? textContent : addCursor(textContent, blinkVisible);

      return composeImageLeftLayout(imageAscii, visibleText, {
        rows,
        columns,
        hintLine
      });
    }

    const visibleFrame = isTransitioning ? frame : addCursor(frame, blinkVisible);
    return centerTextBlock(visibleFrame, {
      rows,
      columns,
      hintLine
    });
  }, [answers, blinkVisible, columns, currentSlide, frame, hintLine, imageAscii, isTransitioning, questionInput, rows, slideIndex]);

  return (
    <Box width="100%" height="100%">
      <Text>{finalFrame}</Text>
    </Box>
  );
}
