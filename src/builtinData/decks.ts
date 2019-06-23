import { Deck } from '../model/Deck';
import thaiDeck from './cards-dev-thai';
import turkishDeck from './cards-dev-turkish';

// we have to explicitly require all of our files; dynamic require will not compile
const decks: Deck[] = [
  {
    ID: 'dev-thai',
    cards: thaiDeck,
    cardsDue: 93,
    name: 'Thai',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Thailand_%28non-standard_colours_2%29.svg/120px-Flag_of_Thailand_%28non-standard_colours_2%29.svg.png',
  },
  {
    ID: 'dev-turkish',
    cards: turkishDeck,
    cardsDue: 47,
    name: 'Turkish',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/' +
      'Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png',
  },
];

export default decks;
