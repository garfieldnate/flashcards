import { IDeckInfo } from './DeckInfo';
export default interface IDeckProvider {
  // TODO: return the object here instead of an array
  getAvailableDecks(): IDeckInfo[];
  getDeck(deckID: string): IDeckInfo;
}
