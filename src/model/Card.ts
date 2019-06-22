export type Card = {
  ID: number;
  front: string;
  back: string;
  category: string;
  exampleForeignLang?: string;
  exampleUserLang?: string;
  // result of asset require() is a number
  foreignHeadwordAudio?: number;
};
