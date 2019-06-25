import IDeckSource from '../model/DeckSource';
import DummyUserData from '../userData/DummyUserData';
export interface IGlobalAppData {
  userData: DummyUserData;
  deckSource: IDeckSource;
}
