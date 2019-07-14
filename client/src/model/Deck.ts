import { CardId, ICard } from './Card';

export interface IDeckInfo {
  ID: string;
  builtinCards: ICard[];
  name: string;
  // result of 'require()' is a number
  thumbnail: number;
  // cardsDue: number;
  // cards: ICard[];
  getPresentationOrder(): CardId[];
}
