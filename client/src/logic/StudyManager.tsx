import moment from 'moment';
import { Card } from '../model/Card';
import { IDeck } from '../model/Deck';
import { UserDeckData } from '../model/UserDeckData';
import DummyUserData from '../userData/DummyUserData';
import NewCardProvider from './NewCardProvider';
import ReviewCardProvider from './ReviewCardProvider';

function getDateTime() {
  return moment();
}

class StudyManager {
  private deck: IDeck;
  private prefs: UserDeckData['prefs'];
  private studyState: UserDeckData['studyState'];
  // TODO: declare these as baser interface type
  private reviewCardProvider: ReviewCardProvider;
  private newCardProvider: NewCardProvider;
  private nextDueTime: number;
  private newCards: Card[];
  private reviewCards: Card[];
  private lastUpdated: moment.Moment;
  private cards: Card[];
  constructor(deck: IDeck, userData: DummyUserData) {
    this.cards = [];
    this.deck = deck;
    // console.log(`created studyManager with ${deck.cards.length} cards`);
    const { prefs, studyState } = userData.getUserDeckData(deck.ID);
    this.prefs = prefs;
    this.studyState = studyState;
    this.reviewCardProvider = new ReviewCardProvider(prefs, studyState);
    this.newCardProvider = new NewCardProvider(deck, studyState);

    // fill cards initially:

    const now = getDateTime();
    const { reviewCards, nextDueTime } = this.reviewCardProvider.getNewCards(
      now.unix()
    );
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

  // TODO: change to Optional<Card>
  public getNextCard = (): Card | undefined => {
    if (this.newCards) {
      return this.newCards.shift(); // technically not efficient but whatevs for now :)
    }
    if (this.reviewCards) {
      return this.reviewCards.shift();
    }
    return;
  };

  public updateStudyData = (currentTime: moment.Moment) => {
    const today = currentTime.format('YYYYMMDD');
    if (today !== this.studyState.lastStudied) {
      this.studyState.lastStudied = today;
      this.studyState.numAddedToday = 0;
    }
  };

  public getNumNewCardsLeftToday = (): number => {
    return this.prefs.numNewCardsPerDay - this.studyState.numAddedToday;
  };

  public update = () => {
    // get review cards that are due now
    const now = getDateTime();
    if (now.unix() > this.nextDueTime) {
      const { reviewCards, nextDueTime } = this.reviewCardProvider.getNewCards(
        now.unix()
      );
      reviewCards.forEach((c) => this.cards.push(c));
      this.lastUpdated = now;
      this.nextDueTime = nextDueTime;
    }

    // for now we do not update new cards here. It's complicated to do it correctly, for one thing.
    // If the user tries to study
    // all night non-stop, we won't help them by adding more cards. Usually
    // the user will close the app at some point, anyway.
  };
}

export default StudyManager;
