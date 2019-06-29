import { IDeck } from '../model/Deck';
import IDeckProvider from '../model/DeckProvider';
import builtinDecks from './BuiltinDecks';

// Decks from this provider are short previews of full decks available from the server

export default class BuiltinDeckProvider implements IDeckProvider {
  private decks: { [id: string]: IDeck };
  constructor() {
    this.decks = {};
    builtinDecks.forEach((deck) => (this.decks[deck.ID] = deck));
  }

  // TODO: return the object here instead of an array
  public getAvailableDecks = () => Array.from(Object.values(this.decks));
  public getDeck = (deckID: string) => this.decks[deckID];
}
