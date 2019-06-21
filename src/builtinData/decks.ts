import { Deck } from '../model/Types';
import thaiDeck from './cards-dev-thai';
import turkishDeck from './cards-dev-turkish';

// we have to explicitly require all of our files; dynamic require will not compile
const decks: Deck[] = [
  {
    ID: 'dev-thai',
    name: 'Thai',
    thumbnail: 'https://atlas.media.mit.edu/static/img/icons/country/country_astha.png',
    cardsDue: 93,
    cards: thaiDeck,
  },
  {
    ID: 'dev-turkish',
    name: 'Turkish',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/' +
      'Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png',
    cardsDue: 47,
    cards: turkishDeck,
  },
];

export default decks;
