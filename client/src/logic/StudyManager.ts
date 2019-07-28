import { observable } from 'mobx';
import { IObservableValue } from 'mobx/lib/internal';
import moment from 'moment';
import { merge, Observable, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Optional } from 'typescript-optional';
import { Database } from '../db/Database';
import { CardId, ICard } from '../model/Card';
import { IDeckInfo } from '../model/DeckInfo';
import { UserDeckData } from '../model/UserDeckData';
import DummyUserData from '../userData/DummyUserData';
import NewCardScheduler from './NewCardScheduler';
import ReviewCardScheduler from './ReviewCardScheduler';

// function getDateTime() {
//   return moment();
// }

enum AddSubtract {
  Add,
  Subtract,
}

class StudyManager {
  private prefs: UserDeckData['prefs'];
  private studyState: UserDeckData['studyState'];
  // TODO: declare these as baser interface type
  private reviewCardScheduler: ReviewCardScheduler;
  private newCardScheduler: NewCardScheduler;
  // private nextDueTime: number;
  // private newCards: CardId[];
  // private reviewCards: CardId[];
  // private lastUpdated: moment.Moment;
  private cards: ICard[];

  private numDue: IObservableValue<number>;
  private studyResultSubject: Subject<AddSubtract.Subtract> = new Subject();
  private numDueChangeObservable: Observable<AddSubtract>;
  constructor(
    public deck: IDeckInfo,
    userData: DummyUserData,
    private database: Promise<Database>
  ) {
    this.cards = [];
    // console.log(`created studyManager with ${deck.cards.length} cards`);
    const { prefs, studyState } = userData.getUserDeckData(deck.getId());
    this.prefs = prefs;
    this.studyState = studyState;

    this.reviewCardScheduler = new ReviewCardScheduler(prefs, studyState);
    this.newCardScheduler = new NewCardScheduler(deck, studyState);

    ({
      numDue: this.numDue,
      // TODO: does this really have to be in a field, or can we ignore it without it being immediately destroyed?
      numDueChangeObservable: this.numDueChangeObservable,
    } = this.setupNumDue());

    // fill cards initially:

    // const now = getDateTime();
    // const {
    //   cardIds: reviewCards,
    //   nextDueTime: nextReviewTime,
    // } = this.reviewCardScheduler.getNewCards(now.unix());
    // this.nextDueTime = nextReviewTime;
    // this.updateStudyData(now);

    // // TODO: max with number of cards left to study in deck
    // const numLeft = this.getNumNewCardsLeftToday();
    // const {
    //   cardIds: newCards,
    //   nextDueTime: nextNewTime,
    // } = this.newCardScheduler.getNewCards(numLeft);
    // this.newCards = newCards;
    // this.reviewCards = reviewCards;

    // this.lastUpdated = now;

    // run update() once per minute
    // TODO: client should set this
    // this.interval = setInterval(this.update, 60000);
  }

  public registerStudyResult(cardId: CardId, outcome: 'bad' | 'good' | 'ok') {
    this.studyResultSubject.next(AddSubtract.Subtract);
  }

  public getCardsDue() {
    const cardsDue: ICard[] = observable([]);

    // merge the two cardId streams, then resolve the promises and add the
    // actual cards to cardsDue in whatever order the promises resolve in.
    // TODO: cache card objects so that we don't hit the DB? DB plugin for that?
    merge(
      this.reviewCardScheduler.getNewCardObservable(),
      this.newCardScheduler.getNewCardObservable()
    )
      .pipe(mergeMap((cardId) => this.getCardById(cardId)))
      .subscribe((card) => {
        if (card.isPresent()) {
          cardsDue.push(card.get());
          console.log(`Pushing card ${card.get().getId()}`);
        }
      });

    return cardsDue;
  }

  // TODO: change to a stream of cards
  // public getNextCard = async (): Promise<Optional<ICard>> => {
  //   let newCardId;
  //   if (this.newCards) {
  //     newCardId = this.newCards.shift(); // TODO technically not efficient but whatevs for now :)
  //   } else if (this.reviewCards) {
  //     newCardId = this.reviewCards.shift();
  //   }
  //   if (newCardId) {
  //     const newCard = this.deck.getBuiltin(newCardId);
  //     if (newCard) {
  //       return newCard;
  //     } else {
  //       const db = await this.database;
  //       const cards = await db.cards.getCardsById([newCardId]);
  //       if (cards) {
  //         return Optional.of(cards[0]);
  //       }
  //     }
  //   }
  //   return Optional.empty();
  // };

  // public updateStudyData = (currentTime: moment.Moment) => {
  //   const today = currentTime.format('YYYYMMDD');
  //   if (today !== this.studyState.lastStudied) {
  //     this.studyState.lastStudied = today;
  //     this.studyState.numAddedToday = 0;
  //   }
  // };

  public getNumDue = (): IObservableValue<number> => {
    return this.numDue;
  };

  private getCardById = async (cardId: CardId): Promise<Optional<ICard>> => {
    const builtinCard = this.deck.getBuiltin(cardId);
    if (builtinCard.isPresent()) {
      return builtinCard;
    }
    const db = await this.database;
    const cards = await db.cards.getCardsById([cardId]);
    if (cards.length) {
      return Optional.of(cards[0]);
    }
    console.log(`Warning: was not able to locate card ${cardId}`);
    return Optional.empty();
  };

  // public update = () => {
  //   // get review cards that are due now
  //   const now = getDateTime();
  //   if (now.unix() > this.nextDueTime) {
  //     const {
  //       cardIds: reviewCards,
  //       nextDueTime,
  //     } = this.reviewCardScheduler.getNewCards(now.unix());
  //     reviewCards.forEach((c) => this.cards.push(c));
  //     this.lastUpdated = now;
  //     this.nextDueTime = nextDueTime;
  //   }

  //   // for now we do not update new cards here. It's complicated to do it correctly, for one thing.
  //   // If the user tries to study
  //   // all night non-stop, we won't help them by adding more cards. Usually
  //   // the user will close the app at some point, anyway.
  // };

  private setupNumDue() {
    const numDueChangeObservable = merge(
      this.reviewCardScheduler
        .getNewCardObservable()
        .pipe(map(() => AddSubtract.Add)),
      this.newCardScheduler
        .getNewCardObservable()
        .pipe(map(() => AddSubtract.Add)),
      this.studyResultSubject
    );
    const numDue = observable.box(0);
    numDueChangeObservable.subscribe({
      next: (next) => {
        const currentVal = numDue.get();
        switch (next) {
          case AddSubtract.Add:
            numDue.set(currentVal + 1);
            break;
          case AddSubtract.Subtract:
            numDue.set(currentVal - 1);
            break;
          default:
            const exhaustiveCheck: never = next;
        }
      },
    });

    return { numDue, numDueChangeObservable };
  }
}

export default StudyManager;
