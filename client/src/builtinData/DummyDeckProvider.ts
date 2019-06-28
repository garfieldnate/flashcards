import { IDeck } from '../model/Deck';
import DeckProvider from '../model/DeckProvider';
import hardcodedDecks from './decks';

// all data from here is hardcoded

export default class DummyDeckProvider implements DeckProvider {
  private decks: { [id: string]: IDeck };
  constructor() {
    this.decks = {};
    hardcodedDecks.forEach((deck) => (this.decks[deck.ID] = deck));
  }

  // TODO: return the object here instead of an array
  public getAvailableDecks = () => Array.from(Object.values(this.decks));
  public getDeck = (deckID: string) => this.decks[deckID];
}
