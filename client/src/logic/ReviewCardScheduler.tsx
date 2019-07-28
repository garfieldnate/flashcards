import moment from 'moment';
import { Observable } from 'rxjs';
import shuffle from 'shuffle-array';
import { CardId } from '../model/Card';
import { UserDeckData } from '../model/UserDeckData';
import { ICardScheduler } from './CardScheduler';

export default class ReviewCardScheduler implements ICardScheduler {
  private cardData: UserDeckData['studyState']['cardData'];
  private lastUpdated: number;
  // private nextDue: number;
  constructor(
    prefs: UserDeckData['prefs'],
    studyState: UserDeckData['studyState']
  ) {
    this.cardData = studyState.cardData;
    this.lastUpdated = 0;
  }

  public getNewCardObservable = () => {
    // const { cardsDue, nextDue } = this.cardData.getCardsDueBetween(
    //   this.lastUpdated,
    //   now
    // );
    // shuffle(cardsDue);

    // // this.nextDue = nextDue;
    // this.lastUpdated = now;
    // return { reviewCards: cardsDue, nextDueTime: 9999999999 };
    const cardStream = new Observable<CardId>((subscriber) => {});
    return cardStream;
  };
}
