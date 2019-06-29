import { Card } from './Card';
export interface IDeck {
  ID: string;
  name: string;
  // result of 'require()' is a number
  thumbnail: number;
  // cardsDue: number;
  cards: Card[];
}
