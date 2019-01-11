import { observable } from 'mobx';
import moment from 'moment';

export default class NewCardProvider {
    constructor(deck, userData) {
        const userDeckData = userData.getUserDeckData(deck.ID);
        const { prefs, studyState } = userDeckData;
        const today = moment().format("YYYY-MM-DD");
        const lastStudied = studyState.lastStudied;
        if(!lastStudied || lastStudied !== today) {
            studyState.numAddedToday = 0;
            studyState.lastStudied = today;
        }
        this.numLeft = observable.box(prefs.numNewCardsPerDay - studyState.numAddedToday);
    }

    getNewCards = () => {
        // TODO:
        // select a maximum of this.numLeft cards;
        // do not grab cards that have already been studied;
        // grab 10 cards from a category at a time;
        // cover more basic vocab categories first
        return deck.cards;
    }
}
