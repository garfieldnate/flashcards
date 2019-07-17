import moment from 'moment';
import { Database } from '../db/Database';
import { CardId, ICard } from '../model/Card';
import { IDeckInfo } from '../model/DeckInfo';
import { UserDeckData } from '../model/UserDeckData';
import DummyUserData from '../userData/DummyUserData';
import NewCardChooser from './NewCardChooser';
import ReviewCardChooser from './ReviewCardChooser';

function getDateTime() {
  return moment();
}

class StudyManager {
  private deck: IDeckInfo;
  private prefs: UserDeckData['prefs'];
  private studyState: UserDeckData['studyState'];
  // TODO: declare these as baser interface type
  private reviewCardChooser: ReviewCardChooser;
  private newCardChooser: NewCardChooser;
  private nextDueTime: number;
  private newCards: CardId[];
  private reviewCards: CardId[];
  private lastUpdated: moment.Moment;
  private cards: ICard[];
  private database: Promise<Database>;
  constructor(deck: IDeckInfo, userData: DummyUserData, db: Promise<Database>) {
    this.cards = [];
    this.deck = deck;
    this.database = db;
    // console.log(`created studyManager with ${deck.cards.length} cards`);
    const { prefs, studyState } = userData.getUserDeckData(deck.getId());
    this.prefs = prefs;
    this.studyState = studyState;
    this.reviewCardChooser = new ReviewCardChooser(prefs, studyState);
    this.newCardChooser = new NewCardChooser(deck, studyState);

    // fill cards initially:

    const now = getDateTime();
    const {
      cardIds: reviewCards,
      nextDueTime: nextReviewTime,
    } = this.reviewCardChooser.getNewCards(now.unix());
    this.nextDueTime = nextReviewTime;
    this.updateStudyData(now);

    // TODO: max with number of cards left to study in deck
    const numLeft = this.getNumNewCardsLeftToday();
    const {
      cardIds: newCards,
      nextDueTime: nextNewTime,
    } = this.newCardChooser.getNewCards(numLeft);
    this.newCards = newCards;
    this.reviewCards = reviewCards;

    this.lastUpdated = now;

    // run update() once per minute
    // TODO: client should set this
    // this.interval = setInterval(this.update, 60000);
  }

  // TODO: change to a stream of cards
  public getNextCard = async (): Promise<ICard | undefined> => {
    let newCardId;
    if (this.newCards) {
      newCardId = this.newCards.shift(); // TODO technically not efficient but whatevs for now :)
    } else if (this.reviewCards) {
      newCardId = this.reviewCards.shift();
    }
    if (newCardId) {
      const newCard = this.deck.getBuiltin(newCardId);
      if (newCard) {
        return newCard;
      } else {
        const db = await this.database;
        const cards = await db.cards.getCardsById([newCardId]);
        if (cards) {
          return cards[0];
        }
      }
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
    // return this.prefs.numNewCardsPerDay - this.studyState.numAddedToday; TODO: use this instead
    return 10;
  };

  public update = () => {
    // get review cards that are due now
    const now = getDateTime();
    if (now.unix() > this.nextDueTime) {
      const {
        cardIds: reviewCards,
        nextDueTime,
      } = this.reviewCardChooser.getNewCards(now.unix());
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
