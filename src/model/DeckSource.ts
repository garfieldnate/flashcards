import { IDeck } from './Deck';
export default interface IDeckSource {
  // TODO: return the object here instead of an array
  getAvailableDecks(): IDeck[];
  getDeck(deckID: string): IDeck;
}
