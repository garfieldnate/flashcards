import { createContext } from 'react';

import { GlobalAppData } from './GlobalAppData';
import { IGlobalAppData } from './IGlobalAppData';

export const AppGlobalsContext = createContext<IGlobalAppData>(
  new GlobalAppData()
);
