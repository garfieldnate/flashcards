import { ObservableMap, ObservableSet } from 'mobx';
import moment from 'moment';
import { UserDeckData } from '../model/UserDeckData';

export default class DummyUserData {
  private STUDY_SOURCES = new ObservableSet<string>();
  private allUserDeckData = new ObservableMap<string, UserDeckData>();

  public addNewStudySource = (sourceID: string) => {
    this.STUDY_SOURCES.add(sourceID);
  };

  get studySources() {
    return this.STUDY_SOURCES;
  }

  public getUserDeckData = (sourceID: string): UserDeckData => {
    let userDeckData = this.allUserDeckData.get(sourceID);
    if (!userDeckData) {
      userDeckData = {
        prefs: {
          numNewCardsPerDay: 3,
        },
        studyState: {
          cardData: {
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
