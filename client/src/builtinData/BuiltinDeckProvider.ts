import { IDeckInfo } from '../model/DeckInfo';
import IDeckProvider from '../model/DeckProvider';
import { BuiltinDeckInfo } from './BuiltinDeck';
import builtinDecks from './BuiltinDecks';

// Decks from this provider are are partially built-in and all have some built-in cards.

export default class BuiltinDeckProvider implements IDeckProvider {
  private decks: { [id: string]: IDeckInfo };
  constructor() {
    this.decks = {};
    builtinDecks.forEach(
      (deckData) => (this.decks[deckData.ID] = new BuiltinDeckInfo(deckData))
    );
  }

  // TODO: return the object here instead of an array
  public getAvailableDecks = () => Array.from(Object.values(this.decks));
  public getDeck = (deckID: string) => this.decks[deckID];
}
