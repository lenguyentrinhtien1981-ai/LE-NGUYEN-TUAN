// FIX: Creating types.ts to define shared types for the application.
export type AspectRatio = '1:1' | '4:5' | '3:4' | '9:16' | '16:9';

// FIX: Refactored GenerationOptions to replace gender with specific body measurements and add face reference image.
export interface GenerationOptions {
  height: string;
  weight: string;
  age: string;
  concept: string;
  outfit: string;
  setting: string;
  props: string;
  expression: string;
  lighting: string;
  composition: string;
  angles: string;
  background: string;
  creativeTechnique: string;
  aspectRatio: AspectRatio;
  faceReferenceImage: File | null;
  propsReferenceImage: File | null;
}

export interface HistoryItem {
  id: number;
  image: string;
  options: GenerationOptions;
}