import BuiltinDeckProvider from '../builtinData/BuiltinDeckProvider';
import IDeckProvider from '../model/DeckProvider';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';

class DummyGlobalAppData implements IGlobalAppData {
  public deckProvider: IDeckProvider = new BuiltinDeckProvider();
  public database = Promise.reject(
    new Error('Dummy global app data does not have a real database')
  ); // TODO: mock DB here
  public userData = new DummyUserData(this.database);
}
