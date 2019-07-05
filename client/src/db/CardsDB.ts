import { RxJsonSchema } from 'rxdb';
import RxDB from './RxDB';
// TODO: this has to be parameterized for dev/prod
const syncURL = 'http://localhost:5984/';
const dbName = 'flashcards';

const cardSchema: RxJsonSchema = {
  description: 'everything that might be contained in a card',
  properties: {
    englishHeadword: {
      type: 'string',
    },
    id: {
      primary: true,
      type: 'string',
    },
  },
  required: ['englishHeadword'],
  title: 'card schema',
  type: 'object',
  version: 0,
};

const createCardCollection = async () => {
  const db = await RxDB.create({
    adapter: 'asyncstorage',
    multiInstance: false,
    name: dbName,
    // password: 'myLongAndStupidPassword',
  });
  const cardCollection = await db.collection({
    name: 'cards',
    schema: cardSchema,
  });
  cardCollection.sync({
    options: {
      live: true,
      retry: true,
    },
    remote: syncURL + dbName + '/',
  });
  // await cardCollection.insert({ id: 'foo', englishHeadword: 'hello' });
  return cardCollection;
};

export default createCardCollection;
