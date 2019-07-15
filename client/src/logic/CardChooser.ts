import { CardId } from '../model/Card';

export interface ICardChooser<GetNewCardsParam> {
  getNewCards(arg: GetNewCardsParam): CardId[];
}
