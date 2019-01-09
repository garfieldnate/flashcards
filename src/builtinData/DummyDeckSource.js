// all data is hardcode in JSON files here

// we have to explicitly require all of our files; dynamic require will not compile
cards = {
    "dev-thai": require("./cards-dev-thai.json"),
    "dev-turkish": require("./cards-dev-turkish.json")
}

class DummyCardSource {
    constructor(cards) {
        for (var key in cards) {
            cards[key].ID = key;
        }
        this.cards = cards;
    }

    // flux-ify this
    getCards = () => this.cards;
}


export default class DummyDeckSource {
    constructor() {
        // using super simple JSON file format for now
        // structure is:
        // {
        //     "<deck ID>": {
        //         "name": "<deck name>",
        //         "thumbnail": "<URI to deck thumbnail>"
        //     }
        //     ...
        this.decks = require('./decks.json');
        for (var key in this.decks) {
            const id = key;
            this.decks[key].getCardSource = () => new DummyCardSource(cards[id]);
            this.decks[key].ID = key;
        }
    }

    getAvailableDecks = () => Array.from(Object.values(this.decks));
    getDeck = (deckID) => this.decks[deckID];
}
