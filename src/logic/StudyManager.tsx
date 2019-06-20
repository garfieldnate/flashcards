import moment from 'moment';
import NewCardProvider from './NewCardProvider';
import ReviewCardProvider from './ReviewCardProvider';

function getDateTime() {
  return moment();
}

class StudyManager {
  deck: any;
  prefs: any;
  studyState: any;
  // TODO: declare these as baser interface type
  reviewCardProvider: ReviewCardProvider;
  newCardProvider: NewCardProvider;
  nextDueTime: number;
  newCards: any;
  reviewCards: any;
  lastUpdated: moment.Moment;
  cards: any;
  constructor(deck, userData) {
    this.deck = deck;
    const { prefs, studyState } = userData.getUserDeckData(deck.ID);
    this.prefs = prefs;
    this.studyState = studyState;
    this.reviewCardProvider = new ReviewCardProvider(prefs, studyState);
    this.newCardProvider = new NewCardProvider(deck, studyState);

    // fill cards initially:

    const now = getDateTime();
    const { reviewCards, nextDueTime } = this.reviewCardProvider.getNewCards(now.unix());
    this.nextDueTime = nextDueTime;
    this.updateStudyData(now);

    // TODO: max with number of cards left to study in deck
    const numLeft = this.getNumNewCardsLeftToday();
    this.newCards = this.newCardProvider.getNewCards(numLeft);
    this.reviewCards = reviewCards;

    this.lastUpdated = now;

    // run update() once per minute
    // TODO: client should set this
    // this.interval = setInterval(this.update, 60000);
  }

  getNextCard = () => {
    if (this.newCards) {
      return this.newCards.shift(); // technically not efficient but whatevs for now :)
    } if (this.reviewCards) {
      return this.reviewCards.shift();
    }
    return null;
  }

  updateStudyData = (currentTime) => {
    const today = currentTime.format('YYYYMMDD');
    if (today !== this.studyState.lastStudied) {
      this.studyState.lastStudied = today;
      this.studyState.numAddedToday = 0;
    }
  }

  getNumNewCardsLeftToday = (): number => {
    return this.prefs.numNewCardsPerDay - this.studyState.numAddedToday;
  }

  update = () => {
    // get review cards that are due now
    const now = getDateTime();
    if (now.unix() > this.nextDueTime) {
      const { reviewCards, nextDueTime } =
        this.reviewCardProvider.getNewCards(now.unix());
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
