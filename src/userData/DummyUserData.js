import { observable, computed } from "mobx";
import { ListView } from "react-native";

import ObservableSet from '../utils/ObservableSet.js';

export default class DummyUserData {
  @observable _studySources = new ObservableSet();

  addNewStudySource = (sourceId) => {
    this._studySources.add(sourceId);
  }

  get studySources() {
    return this._studySources;
  }
}
