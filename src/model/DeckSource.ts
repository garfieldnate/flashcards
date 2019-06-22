import { Deck } from "./Deck";
export default interface DeckSource {
  // TODO: return the object here instead of an array
  getAvailableDecks(): Deck[];
  getDeck(deckID: string): Deck;
}
