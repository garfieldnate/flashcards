import { observable } from 'mobx';
import DummyDeckSource from '../builtinData/DummyDeckSource';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';
export class GlobalAppData implements IGlobalAppData {
  @observable
  public userData = new DummyUserData();
  @observable
  public deckSource = new DummyDeckSource();
}
