import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { err, ok, Result } from 'neverthrow';
import { ImageURISource } from 'react-native';
import { RxCollection, RxDatabase, RxDocument, RxJsonSchema } from 'rxdb';
import RxDB from './RxDB';
import { CardSchema as CardDocType } from './schemata/card';
// TODO: this has to be parameterized for dev/prod
const syncURL = 'http://localhost:5984/';
const dbName = 'flashcards';

// TypeScript can't give the correct type if we import and *then* type annotate
// tslint:disable-next-line: no-var-requires
const cardSchema: RxJsonSchema<CardDocType> = require('./schemata/card.json');
type CardDocMethods = {
  getForeignHeadwordAudio: () => Promise<Result<Sound, any>>;
  getImage: () => Promise<Result<ImageURISource, any>>;
};
type CardDocument = RxDocument<CardDocType, CardDocMethods>;

const cardDocMethods: CardDocMethods = {
  async getForeignHeadwordAudio(this: CardDocument) {
    try {
      const dataBlob = await this.getAttachment(
        'foreignHeadwordAudio'
      ).getData();
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: URL.createObjectURL(dataBlob) });
      return ok(sound);
    } catch (e) {
      return err(err);
    }
  },
  async getImage(this: CardDocument) {
    try {
      const dataBlob = await this.getAttachment('image').getData();
      return ok({ uri: URL.createObjectURL(dataBlob) });
    } catch (e) {
      return err(e);
    }
  },
};
type CardCollectionMethods = {
  // getCardsForDeck: (deckId: string) => Promise<...>;
};
const cardCollectionMethods: CardCollectionMethods = {};
type CardCollection = RxCollection<
  CardDocType,
  CardDocMethods,
  CardCollectionMethods
>;

type DatabaseCollections = {
  cards: CardCollection;
};
export type DatabaseType = RxDatabase<DatabaseCollections>;

export const database: Promise<DatabaseType> = RxDB.create<DatabaseCollections>(
  {
    adapter: 'asyncstorage',
    multiInstance: false,
    name: dbName,
  }
).then(async (db) => {
  await createCollections;
  return db;
});

// TODO: when can this fail? How should we retry if it does?
const createCollections = async () => {
  const db = await database;
  if (db.cards) {
    return;
  }
  const cardCollection = await db.collection({
    methods: cardDocMethods,
    name: 'cards',
    schema: cardSchema,
    statics: cardCollectionMethods,
  });
  await cardCollection.sync({
    direction: { pull: true, push: false },
    options: {
      live: true,
      retry: true,
    },
    remote: syncURL + dbName + '/',
  });
};
