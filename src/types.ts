export type SlideSize = 'normal' | 'large' | 'xlarge';
export type SlideAlign = 'left' | 'center' | 'right';
export type SlideSide = 'left' | 'right';

export interface SlideScreen {
  widthPercent: number;
  contentAlign: SlideAlign;
}

export interface Slide {
  index: number;
  raw: string;
  body: string;
  beautify?: boolean;
  footnote?: string;
  asciiArt?: string;
  screens?: SlideScreen[];
  isAsciiArt: boolean;
  hasQuestion: boolean;
  titleText?: string;
  qrText?: string;
  qrWidthPercent?: number;
  imagePath?: string;
  imageWidthPercent?: number;
  imageBackgroundColor?: string;
  align?: SlideAlign;
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
