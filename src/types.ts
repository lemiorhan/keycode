export type SlideSize = 'normal' | 'large' | 'xlarge';

export interface Slide {
  index: number;
  raw: string;
  body: string;
  isAsciiArt: boolean;
  hasQuestion: boolean;
  titleText?: string;
  qrText?: string;
  size: SlideSize;
}

export interface ParsedDeck {
  slides: Slide[];
}

export interface TransitionFrame {
  step: number;
  totalSteps: number;
  output: string;
}

export interface QuestionState {
  slideIndex: number;
  answer: string;
}
