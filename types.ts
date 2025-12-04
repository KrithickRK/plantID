export interface Translations {
  hindi: string;
  tamil: string;
  kannada: string;
  bengali: string;
  marathi: string;
  telugu: string;
  gujarati: string;
  malayalam: string;
}

export interface Hazard {
  isHarmful: boolean;
  effects: string;
}

export interface PlantData {
  scientificName: string;
  commonName: string;
  description: string;
  translations: Translations;
  medicinalProperties: string;
  hazard: Hazard;
  confidence: number;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
}

export enum LoadingStage {
  IDLE = 'IDLE',
  COMPRESSING = 'COMPRESSING',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE',
}