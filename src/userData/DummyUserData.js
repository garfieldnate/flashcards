import { observable, computed } from "mobx";
import { ListView } from "react-native";

export default class DummyUserData {
  @observable _studySources = [];

  addNewStudySource = (sourceId) => {
    this._studySources.push(sourceId);
  }

  get studySources() {
    return this._studySources;
  }
}
