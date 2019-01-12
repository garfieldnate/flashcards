// all data is hardcode in JSON files here

// we have to explicitly require all of our files; dynamic require will not compile
cards = {
    "dev-thai": require("./cards-dev-thai.json"),
    "dev-turkish": require("./cards-dev-turkish.json")
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
            this.decks[key].cards = cards[id];
            this.decks[key].isBuiltin = true;
            this.decks[key].ID = key;
        }
    }

    getAvailableDecks = () => Array.from(Object.values(this.decks));
    getDeck = (deckID) => this.decks[deckID];
}
