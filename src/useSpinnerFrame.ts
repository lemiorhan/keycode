import {useEffect, useState} from 'react';

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] as const;

export function useSpinnerFrame(active: boolean, intervalMs = 90): string {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setFrameIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setFrameIndex((current) => (current + 1) % SPINNER_FRAMES.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [active, intervalMs]);

  return SPINNER_FRAMES[frameIndex] ?? SPINNER_FRAMES[0];
}
