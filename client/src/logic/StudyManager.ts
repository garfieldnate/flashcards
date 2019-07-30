import { observable } from 'mobx';
import { IObservableArray, IObservableValue } from 'mobx/lib/internal';
import moment from 'moment';
import { merge, Observable, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Optional } from 'typescript-optional';
import { Database } from '../db/Database';
import { CardId, ICard } from '../model/Card';
import { IDeckInfo } from '../model/DeckInfo';
import { UserDeckData } from '../model/UserDeckData';
import DummyUserData from '../userData/DummyUserData';
import { ICardScheduler } from './CardScheduler';
import NewCardScheduler from './NewCardScheduler';
import ReviewCardScheduler from './ReviewCardScheduler';
import { StudyResult } from './StudyResult';

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
  private reviewCardScheduler: ICardScheduler;
  private newCardScheduler: ICardScheduler;

  private numDue: IObservableValue<number>;
  private studyResultSubject: Subject<AddSubtract.Subtract> = new Subject();
  constructor(
    public deck: IDeckInfo,
    userDeckData: UserDeckData,
    private database: Promise<Database>
  ) {
    const { prefs, studyState } = userDeckData;
    this.prefs = prefs;
    this.studyState = studyState;

    this.reviewCardScheduler = new ReviewCardScheduler(prefs, studyState);
    this.newCardScheduler = new NewCardScheduler(deck, studyState);

    this.numDue = this.setupNumDue();
  }

  public registerStudyResult(cardId: CardId, result: StudyResult) {
    this.studyResultSubject.next(AddSubtract.Subtract);
    // TODO: save result in datastore, use to reschedule
    console.log(`TODO: handle getting score of ${result}`);
  }

  public getCardsDue() {
    const cardsDue: IObservableArray<ICard> = observable([]);
    const hadRetrievalError: IObservableValue<boolean> = observable.box(false);

    // merge the two cardId streams, then resolve the promises and add the
    // actual cards to cardsDue in whatever order the promises resolve in.
    // TODO: cache card objects so that we don't hit the DB? DB plugin for that?
    this.getNewCardObservable()
      .pipe(mergeMap((cardId) => this.getCardById(cardId)))
      .subscribe((card) => {
        if (card.isPresent()) {
          cardsDue.push(card.get());
          console.log(`Pushing card ${card.get().getId()}`);
        } else {
          hadRetrievalError.set(true);
        }
      });

    return { cardsDue, hadRetrievalError };
  }

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

  private setupNumDue() {
    const numDue = observable.box(0);

    const numDueChangeObservable = merge(
      this.getNewCardObservable().pipe(map(() => AddSubtract.Add)),
      this.studyResultSubject
    );
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

    return numDue;
  }

  private getNewCardObservable() {
    return merge(
      this.reviewCardScheduler.getNewCardObservable(),
      this.newCardScheduler.getNewCardObservable()
    );
  }
}

export default StudyManager;
