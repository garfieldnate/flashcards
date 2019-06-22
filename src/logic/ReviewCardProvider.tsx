import moment from 'moment';
import shuffle from 'shuffle-array';

export default class ReviewCardProvider {
  private cardData: any;
  private lastUpdated: number;
  private nextDue: any;
  constructor(prefs, studyState) {
    this.cardData = studyState.cardData;
    this.lastUpdated = 0;
  }

  // TODO: wouldn't a real DateTime type be better here?
  public getNewCards = (now: number) => {
    const { cardsDue, nextDue } = this.cardData.getCardsDueBetween(this.lastUpdated, now);
    shuffle(cardsDue);

    this.nextDue = nextDue;
    this.lastUpdated = now;
    return { reviewCards: cardsDue, nextDueTime: 9999999999 };
  }
}
