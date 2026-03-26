import {Box, Text, useApp, useInput, useStdout} from 'ink';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {centerTextBlock, composeBottomRightOverlayLayout} from './layout.js';
import {renderTerminalQr} from './qr.js';
import type {QuestionState, Slide} from './types.js';
import {renderSlideTextContent} from './renderSlide.js';
import {buildTransitionFrames} from './transition.js';
import {shouldSkipTransition} from './transitionPolicy.js';
import {useBlinkCursor} from './useBlink.js';
import {useQuestionInput} from './useQuestionInput.js';

interface PresentationAppProps {
  slides: Slide[];
}

const TRANSITION_MS = 34;
const NORMAL_TRANSITION_STEPS = 10;
const COMPACT_TRANSITION_STEPS = 4;

function addCursor(content: string, cursorVisible: boolean): string {
  const cursor = cursorVisible ? '█' : ' ';
  return `${content}${cursor}`;
}

export function PresentationApp({slides}: PresentationAppProps): React.JSX.Element {
  const {exit} = useApp();
  const {stdout} = useStdout();
  const [slideIndex, setSlideIndex] = useState(0);
  const [frame, setFrame] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [answers, setAnswers] = useState<Record<number, QuestionState>>({});
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

  const renderedTextContent = useMemo(() => {
    if (!currentSlide) {
      return 'No slides found.';
    }

    return renderSlideTextContent({
      slide: currentSlide,
      answer: answers[slideIndex],
      questionInput
    });
  }, [answers, currentSlide, questionInput, slideIndex]);

  const qrRender = useMemo(() => {
    if (!currentSlide?.qrText) {
      return undefined;
    }

    const maxColumns = Math.max(Math.floor(columns * 0.4), 12);
    const maxRows = Math.max(rows - 2, 4);

    return renderTerminalQr(currentSlide.qrText, {
      maxColumns,
      maxRows
    });
  }, [columns, currentSlide, rows]);

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
    let currentStep = 0;
    setIsTransitioning(true);
    setFrame(frames[0]?.output ?? renderedTextContent);

    timerRef.current = setInterval(() => {
      currentStep += 1;

      if (currentStep >= frames.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

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
  }, [columns, currentSlide, renderedTextContent, rows]);

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
  const finalFrame = qrRender
    ? composeBottomRightOverlayLayout(visibleTextFrame, qrRender.output, {
        rows,
        columns
      })
    : centerTextBlock(visibleTextFrame, {
        rows,
        columns
      });

  return (
    <Box width="100%" height="100%">
      <Text>{finalFrame}</Text>
    </Box>
  );
}
