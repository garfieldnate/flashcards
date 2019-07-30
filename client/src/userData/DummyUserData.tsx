import { observable, ObservableMap, ObservableSet } from 'mobx';
import moment from 'moment';
import { Database } from '../db/Database';
import StudyManager from '../logic/StudyManager';
import { IDeckInfo } from '../model/DeckInfo';
import { UserDeckData } from '../model/UserDeckData';

export default class DummyUserData {
  private studyDecks = new ObservableSet<string>();
  @observable
  private studyManagers: StudyManager[] = [];
  private allUserDeckData = new ObservableMap<string, UserDeckData>();

  constructor(private database: Promise<Database>) {}

  public getStudyDecks() {
    return this.studyDecks;
  }

  // Next: change studySources to observableArray of studymanagers;
  // add method to studymanager that returns deckinfo;
  // also created UserData interface
  public getStudySources() {
    return this.studyManagers;
  }

  public addNewStudySource = (sourceDeck: IDeckInfo) => {
    if (!this.studyDecks.has(sourceDeck.getId())) {
      this.studyDecks.add(sourceDeck.getId());
      this.studyManagers.push(
        new StudyManager(
          sourceDeck,
          this.getUserDeckData(sourceDeck.getId()),
          this.database
        )
      );
    }
  };

  public getUserDeckData = (sourceID: string): UserDeckData => {
    let userDeckData = this.allUserDeckData.get(sourceID);
    if (!userDeckData) {
      userDeckData = {
        prefs: {
          numNewCardsPerDay: 3,
        },
        studyState: {
          cardData: {
            getCardsDue: () => -1,
            getCardsDueBetween: (start, end) => ({
              cardsDue: [],
              nextDue: 9999999999999,
            }),
          },
          lastStudied: moment().format('YYYY-MM-DD'),
          numAddedToday: 0,
        },
      };
      this.allUserDeckData.set(sourceID, userDeckData);
    }
    return userDeckData;
  };
}
