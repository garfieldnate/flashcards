import { CardId } from '../model/Card';

export type GetNewCardsReturnType = {
  cardIds: CardId[];
  nextDueTime: number;
};

export interface ICardScheduler<GetNewCardsParam> {
  getNewCards(arg: GetNewCardsParam): GetNewCardsReturnType;
}
