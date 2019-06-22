import { observable, ObservableSet } from 'mobx';
import moment from 'moment';
import IUserData from '../model/UserData';

export default class DummyUserData implements IUserData {
  @observable private STUDY_SOURCES = new ObservableSet<string>();
  private allUserDeckData = new Map();

  public addNewStudySource = (sourceID: string) => {
    this.STUDY_SOURCES.add(sourceID);
  };

  get studySources() {
    return this.STUDY_SOURCES;
  }

  public getUserDeckData = (sourceID) => {
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
