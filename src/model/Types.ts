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

interface DeckSource {
  // TODO: return the object here instead of an array
  getAvailableDecks(): Deck[];
  getDeck(deckID: string): Deck;
}

export { Card, Deck, DeckSource };
