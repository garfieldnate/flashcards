import { CardId } from '../model/Card';
import { IDeckInfo } from '../model/Deck';
import { UserDeckData } from '../model/UserDeckData';
import { ICardChooser } from './CardChooser';

// TODO: all of the logic for choosing how many new cards to get should reside
// in the parent StudyManager. This class should only concern itself with which new cards to pick.

export default class NewCardChooser implements ICardChooser<number> {
  private deck: IDeckInfo;
  private studyState: UserDeckData['studyState'];
  constructor(deck: IDeckInfo, studyState: UserDeckData['studyState']) {
    // TODO: inject these instead of extracting from deck and userData
    this.deck = deck;
    this.studyState = studyState;
  }

  public getNewCards = (numLeft: number): CardId[] => {
    // TODO:
    // select a maximum of this.numLeft cards;
    // do not grab cards that have already been studied;
    // grab 10 cards from a category at a time;
    // cover more basic vocab categories first

    return this.deck.getPresentationOrder().slice(0, 20);
  };
}
