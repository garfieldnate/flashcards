import { Observable } from 'rxjs';
import { CardId } from '../model/Card';
import { IDeckInfo } from '../model/DeckInfo';
import { UserDeckData } from '../model/UserDeckData';
import { ICardScheduler } from './CardScheduler';

// TODO: all of the logic for choosing how many new cards to get should reside
// in the parent StudyManager. This class should only concern itself with which new cards to pick.

export default class NewCardScheduler implements ICardScheduler {
  private deck: IDeckInfo;
  private studyState: UserDeckData['studyState'];
  constructor(deck: IDeckInfo, studyState: UserDeckData['studyState']) {
    // TODO: inject these instead of extracting from deck and userData
    this.deck = deck;
    this.studyState = studyState;
  }

  public getNewCardObservable = () => {
    // TODO:
    // select a maximum of studyState.numNewLeftToday cards;
    // do not grab cards that have already been studied;
    // grab 10 cards from a category at a time;
    // cover more basic vocab categories first
    const cardStream = new Observable<CardId>((subscriber) => {
      for (const cardId of this.deck.getPresentationOrder().slice(0, 20)) {
        subscriber.next(cardId);
      }
    });
    return cardStream;
  };
}
