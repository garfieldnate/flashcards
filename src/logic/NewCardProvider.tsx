import { observable } from 'mobx';
import { Deck } from '../model/Deck';
// import moment from 'moment';

// TODO: all of the logic for choosing how many new cards to get should reside
// in the parent StudyManager. This class should only concern itself with which new cards to pick.

export default class NewCardProvider {
  // TODO: get rid of anys everywhere
  private deck: any;
  private studyState: any;
  constructor(deck: Deck, studyState) {
    // TODO: inject these instead of extracting from deck and userData
    this.deck = deck;
    this.studyState = studyState;
  }

  public getNewCards = (numLeft: number) => {
    // TODO:
    // select a maximum of this.numLeft cards;
    // do not grab cards that have already been studied;
    // grab 10 cards from a category at a time;
    // cover more basic vocab categories first

    return this.deck.cards;
  }
}
