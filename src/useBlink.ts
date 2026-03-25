import {useEffect, useState} from 'react';

export function useBlinkCursor(intervalMs = 530): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible((current) => !current);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return visible;
}
