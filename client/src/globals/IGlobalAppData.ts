import { Database } from '../db/Database';
import IDeckProvider from '../model/DeckProvider';
import DummyUserData from '../userData/DummyUserData';
export interface IGlobalAppData {
  userData: DummyUserData;
  deckProvider: IDeckProvider;
  database: Promise<Database>;
}
