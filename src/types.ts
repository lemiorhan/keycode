export interface Slide {
  index: number;
  raw: string;
  body: string;
  isAsciiArt: boolean;
  hasQuestion: boolean;
  titleText?: string;
  imageSource?: string;
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
