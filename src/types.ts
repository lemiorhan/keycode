export type SlideSize = 'normal' | 'large' | 'xlarge';
export type SlideAlign = 'left' | 'center' | 'right';
export type SlideSide = 'left' | 'right';
export type SlideVerticalAlign = 'top' | 'bottom';
export type QrColors = 'black-on-white' | 'white-on-black' | 'white-on-transparent';
export type NamedColor = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';

export interface AiSimulationStep {
  content: string;
  delayMs?: number;
}

export interface AiSimulation {
  intervalMinMs: number;
  intervalMaxMs: number;
  steps: AiSimulationStep[];
  finalContent?: string;
}

export interface SlideScreen {
  widthPercent: number;
  contentAlign: SlideAlign;
}

export interface SlideNumberDirective {
  hAlign: SlideAlign;
  vAlign: SlideVerticalAlign;
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
  aiSimulation?: AiSimulation;
  headerText?: string;
  headerColor?: NamedColor;
  titleText?: string;
  qrText?: string;
  qrWidthPercent?: number;
  qrColors?: QrColors;
  imagePath?: string;
  imageWidthPercent?: number;
  imageBackgroundColor?: string;
  slideNumber?: SlideNumberDirective;
  align?: SlideAlign;
  size: SlideSize;
  presenterNotes?: string;
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
