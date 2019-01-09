// Taken from https://github.com/mobxjs/mobx/issues/69#issuecomment-293256272
import {observable, ObservableMap } from 'mobx';
const { enhancer: deepEnhancer } = observable.map();


export default class ObservableSet extends ObservableMap {
  constructor(initialValues=[], name) {
    super(initialValues.map(v => [v,v]), deepEnhancer, name);
  }

  static create() {
    return new this(...arguments);
  }

  add(value) {
    return this.set(value, value);
  }

  forEach(callback, thisArg = this) {
    for(const value of this) {
      callback.call(thisArg, value);
    }
  }

  [Symbol.iterator]() {
    return this.keys();
  }
}
