import { createContext } from 'react';

import DummyDeckProvider from '../builtinData/DummyDeckProvider';
import IDeckProvider from '../model/DeckProvider';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';

class DummyGlobalAppData implements IGlobalAppData {
  public userData = new DummyUserData();
  public deckProvider: IDeckProvider = new DummyDeckProvider();
}

export const AppGlobalsContext = createContext<IGlobalAppData>(
  new DummyGlobalAppData()
);
