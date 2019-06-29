export type Card = {
  ID: number;
  headwordUserLang: string;
  headwordForeignLang: string;
  category: string;
  exampleForeignLang?: string;
  exampleUserLang?: string;
  // result of asset require() is a number
  foreignHeadwordAudio?: number;
  image?: number;
};
