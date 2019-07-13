// Generated automatically with init_cards.py. EDITS WILL BE LOST!
import { IDeck } from '../model/Deck';
import BuiltinCard from './BuiltinCard';
import thaiDeck from './cards-thai';
// we have to explicitly require all of our files; dynamic require will not compile with Expo :(
const decks: IDeck[] = [
  {
    ID: 'thai',
    cards: thaiDeck.map((c) => new BuiltinCard(c)),
    name: 'Thai',
    thumbnail: require('../../assets/deckPreviews/images/thai/thumbnail.png'),
  },
];

export default decks;
