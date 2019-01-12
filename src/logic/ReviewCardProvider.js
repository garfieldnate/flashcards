import { observable } from 'mobx';
import moment from 'moment';
import shuffle from 'shuffle-array';

export default class ReviewCardProvider {
  constructor (prefs, studyState) {
    this.cardData = studyState.cardData;
    this.lastUpdated = 0;
  }

  getNewCards = () => {
    const now = moment().unix();
    const { cardsDue, nextDue } = this.cardData.getCardsDueBetween(this.lastUpdated, now);
    shuffle(cardsDue);

    this.nextDue = nextDue;
    this.lastUpdated = now;
    return { reviewCards: cardsDue, nextDue: 9999999999 };
  }
}
