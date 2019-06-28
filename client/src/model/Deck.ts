import { Card } from './Card';
export interface IDeck {
  ID: string;
  name: string;
  thumbnail: string;
  cardsDue: number;
  cards: Card[];
}
