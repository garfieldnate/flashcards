import { observable } from 'mobx';
import BuiltinDeckProvider from '../builtinData/BuiltinDeckProvider';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';
export class GlobalAppData implements IGlobalAppData {
  @observable
  public userData = new DummyUserData();
  @observable
  public deckProvider = new BuiltinDeckProvider();
}
