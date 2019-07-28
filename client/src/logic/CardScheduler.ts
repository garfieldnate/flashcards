import { Observable } from 'rxjs';
import { CardId } from '../model/Card';

export type GetNewCardsReturnType = {
  cardIds: CardId[];
  nextDueTime: number;
};

export interface ICardScheduler {
  // TODO: change type to {cards, nextDue}
  getNewCardObservable(): Observable<CardId>;
}
