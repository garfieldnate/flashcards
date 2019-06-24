import moment from 'moment';
import shuffle from 'shuffle-array';
import { Card } from '../model/Card';
import { UserDeckData } from '../model/UserDeckData';

export default class ReviewCardProvider {
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

  // TODO: wouldn't a real DateTime type be better here?
  public getNewCards = (now: number) => {
    const { cardsDue, nextDue } = this.cardData.getCardsDueBetween(
      this.lastUpdated,
      now
    );
    shuffle(cardsDue);

    // this.nextDue = nextDue;
    this.lastUpdated = now;
    return { reviewCards: cardsDue, nextDueTime: 9999999999 };
  };
}
