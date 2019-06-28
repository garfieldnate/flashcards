import { IDeck } from './Deck';
export default interface IDeckProvider {
  // TODO: return the object here instead of an array
  getAvailableDecks(): IDeck[];
  getDeck(deckID: string): IDeck;
}
