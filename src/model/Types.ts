type Card = {
  ID: number,
  front: string,
  back: string,
  category: string,
  exampleForeignLang?: string,
  exampleUserLang?: string,
  // result of asset require() is a number
  foreignHeadwordAudio?: number,
};

type Deck = {
  ID: string,
  name: string,
  thumbnail: string,
  cardsDue: number,
  cards: Card[],
};

export { Card, Deck };
