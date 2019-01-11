import { observable } from 'mobx';

class StudyManager {
    @observable cards = [];

    constructor(deck, userData) {
        Object.entries(deck.cards).forEach(
            ([key, val]) => this.cards.push(val));
        // this.interval = setInterval(() => {
        //     this.cards.clear;
        //     Object.entries(deck.cards).forEach(
        //         ([key, val]) => this.cards.push(val));
        // }, 3000);
    }
}


export default StudyManager;
