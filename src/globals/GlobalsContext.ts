import { createContext } from 'react';

import DummyDeckSource from '../builtinData/DummyDeckSource';
import IDeckSource from '../model/DeckSource';
import DummyUserData from '../userData/DummyUserData';
import { IGlobalAppData } from './IGlobalAppData';

class DummyGlobalAppData {
  public userData = new DummyUserData();
  public deckSource: IDeckSource = new DummyDeckSource();
}

export const AppGlobalsContext = createContext<IGlobalAppData>(
  new DummyGlobalAppData()
);
