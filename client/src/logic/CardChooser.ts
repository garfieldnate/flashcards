import { CardId } from '../model/Card';

export type GetNewCardsReturnType = {
  cardIds: CardId[];
  nextDueTime: number;
};

export interface ICardChooser<GetNewCardsParam> {
  getNewCards(arg: GetNewCardsParam): GetNewCardsReturnType;
}
