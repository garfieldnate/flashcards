import { Deck } from '../model/Types';
import hardcodedDecks from './decks';

// all data from here is hardcoded

export default class DummyDeckSource {
  decks: { [id: string]: Deck };
  constructor() {
    this.decks = {};
    hardcodedDecks.forEach(deck => this.decks[deck.ID] = deck);
  }

  // TODO: return the object here instead of an array
  getAvailableDecks = () => Array.from(Object.values(this.decks));
  getDeck = (deckID: string) => this.decks[deckID];
}
