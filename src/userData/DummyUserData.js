import { observable, computed } from "mobx";
import moment from 'moment';
import { ListView } from "react-native";

import ObservableSet from '../utils/ObservableSet.js';

export default class DummyUserData {
  @observable _studySources = new ObservableSet();
  allUserDeckData = new Map();

  addNewStudySource = (sourceID) => {
    this._studySources.add(sourceID);
  }

  get studySources() {
    return this._studySources;
  }


  getUserDeckData = (sourceID) => {
    var userDeckData = this.allUserDeckData.get(sourceID);
    if(!userDeckData) {
      userDeckData =
        {
          prefs: {
            numNewCardsPerDay: 3,
          },
          studyState: {
            lastStudied: moment().format("YYYY-MM-DD"),
            numAddedToday: 0,
            cardData: {
              getCardsDueBetween: (start, end) => ({
                cardsDue: [],
                nextDue:  9999999999999
              })
            }
          }
        };
      this.allUserDeckData.set(sourceID, userDeckData);
    }
    return userDeckData;
  }
}
