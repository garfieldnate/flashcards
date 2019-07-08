import { observable } from 'mobx';
import BuiltinDeckProvider from '../builtinData/BuiltinDeckProvider';
import { database } from '../db/Database';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';
export class GlobalAppData implements IGlobalAppData {
  @observable
  public userData = new DummyUserData();
  @observable
  public deckProvider = new BuiltinDeckProvider();
  public database = database;
}
