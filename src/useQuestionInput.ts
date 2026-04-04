import {useInput} from 'ink';
import {useEffect, useState} from 'react';

interface UseQuestionInputOptions {
  enabled: boolean;
  initialValue?: string;
  interceptInput?: (input: string, key: {ctrl: boolean; meta: boolean}) => boolean;
  onSubmit: (value: string) => void;
}

export function useQuestionInput(options: UseQuestionInputOptions): string {
  const [value, setValue] = useState(options.initialValue ?? '');

  useEffect(() => {
    setValue(options.initialValue ?? '');
  }, [options.initialValue]);

  useInput((input, key) => {
    if (!options.enabled) {
      return;
    }

    if (options.interceptInput?.(input, {ctrl: key.ctrl, meta: key.meta})) {
      return;
    }

    if (key.return) {
      options.onSubmit(value);
      return;
    }

    if (key.backspace || key.delete) {
      setValue((current) => current.slice(0, -1));
      return;
    }

    if (!key.ctrl && !key.meta && input) {
      setValue((current) => current + input);
    }
  }, {isActive: options.enabled});

  return value;
}
