import { Card } from './Card';
export type Deck = {
  ID: string;
  name: string;
  thumbnail: string;
  cardsDue: number;
  cards: Card[];
}
