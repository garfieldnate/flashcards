import moment from 'moment';
import NewCardProvider from './NewCardProvider.js';
import ReviewCardProvider from './ReviewCardProvider.js';

function getDateTime() {
  return moment();
}

class StudyManager {
  constructor(deck, userData) {
    this.deck = deck;
    const { prefs, studyState } = userData.getUserDeckData(deck.ID);
    this.prefs = prefs;
    this.studyState = studyState;
    this.reviewCardProvider = new ReviewCardProvider(prefs, studyState);
    this.newCardProvider = new NewCardProvider(deck, studyState);

    // fill cards initially:

    now = getDateTime();
    const { reviewCards, nextDueTime } = this.reviewCardProvider.getNewCards(now.unix());
    this.nextDueTime = nextDueTime;
    this.updateStudyData(now);

    // TODO: max with number of cards left to study in deck
    const numLeft = this.getNumNewCardsLeftToday();
    this.newCards = this.newCardProvider.getNewCards(numLeft)
    this.reviewCards = reviewCards

    this.lastUpdated = now;

    // run update() once per minute
    // TODO: client should set this
    // this.interval = setInterval(this.update, 60000);
  }

  getNextCard = () => {
    if (this.newCards) {
      return this.newCards.shift(); // technically not efficient but whatevs for now :)
    } else if(this.reviewCards) {
      return this.reviewCards.shift();
    }
    return null;
  }

  updateStudyData = (currentTime) => {
    today = currentTime.format("YYYYMMDD");
    if(today !== this.studyState.lastStudied) {
      this.studyState.lastStudied = today;
      this.studyState.numAddedToday = 0;
    }
  }

  getNumNewCardsLeftToday = () => {
    this.prefs.numNewCardsPerDay - this.studyState.numAddedToday;
  }

  update = () => {
    // get review cards that are due now
    now = getDateTime();
    if (now.unix() > this.nextDueTime) {
      const {reviewCards, nextDueTime} = this.reviewCardProvider.getNewCards(this.lastUpdated.unix(), now.unix());
      reviewCards.forEach(c => this.cards.push(c));
      this.lastUpdated = now;
      this.nextDueTime = nextDueTime;
    }

    // for now we do not update new cards here. It's complicated to do it correctly, for one thing.
    // If the user tries to study
    // all night non-stop, we won't help them by adding more cards. Usually
    // the user will close the app at some point, anyway.
  }
}


export default StudyManager;
