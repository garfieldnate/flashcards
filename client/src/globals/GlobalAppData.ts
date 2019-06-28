import { observable } from 'mobx';
import DummyDeckProvider from '../builtinData/DummyDeckProvider';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';
export class GlobalAppData implements IGlobalAppData {
  @observable
  public userData = new DummyUserData();
  @observable
  public deckProvider = new DummyDeckProvider();
}
