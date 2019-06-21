import { observable, ObservableSet } from 'mobx';
import moment from 'moment';

export default class DummyUserData {
  @observable STUDY_SOURCES = new ObservableSet<string>();
  allUserDeckData = new Map();

  addNewStudySource = (sourceID: string) => {
    this.STUDY_SOURCES.add(sourceID);
  }

  get studySources() {
    return this.STUDY_SOURCES;
  }

  getUserDeckData = (sourceID) => {
    let userDeckData = this.allUserDeckData.get(sourceID);
    if (!userDeckData) {
      userDeckData =
      {
        prefs: {
          numNewCardsPerDay: 3,
        },
        studyState: {
          lastStudied: moment().format('YYYY-MM-DD'),
          numAddedToday: 0,
          cardData: {
            getCardsDueBetween: (start, end) => ({
              cardsDue: [],
              nextDue: 9999999999999,
            }),
          },
        },
      };
      this.allUserDeckData.set(sourceID, userDeckData);
    }
    return userDeckData;
  }
}
