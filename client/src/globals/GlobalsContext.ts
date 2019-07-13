import { createContext } from 'react';

import BuiltinDeckProvider from '../builtinData/BuiltinDeckProvider';
import IDeckProvider from '../model/DeckProvider';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';

class DummyGlobalAppData implements IGlobalAppData {
  public userData = new DummyUserData();
  public deckProvider: IDeckProvider = new BuiltinDeckProvider();
  public database = Promise.reject(); // TODO: mock DB here
}

export const AppGlobalsContext = createContext<IGlobalAppData>(
  new DummyGlobalAppData()
);
