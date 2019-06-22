import { Deck } from './Deck';
export default interface IDeckSource {
  // TODO: return the object here instead of an array
  getAvailableDecks(): Deck[];
  getDeck(deckID: string): Deck;
}
