import { RxDatabase } from 'rxdb';
import {
  CardCollection,
  collectionOpts as cardCollectionOpts,
} from './CardCollection';
import { CollectionOpts } from './CollectionOpts';
import RxDB from './RxDB';

// TODO: this has to be parameterized for dev/prod
const syncURL = 'http://localhost:5984/';
const dbName = 'flashcards';

type DatabaseCollections = {
  cards: CardCollection;
};
type Collections = { [key in keyof DatabaseCollections]: CollectionOpts };

const collections: Collections = {
  cards: cardCollectionOpts,
};
export type Database = RxDatabase<DatabaseCollections>;

export const database: Promise<Database> = RxDB.create<DatabaseCollections>({
  adapter: 'asyncstorage',
  multiInstance: false,
  name: dbName,
}).then(async (db) => {
  // deletes the whole DB if needed. Only for development when changing a collection's schema!
  // const colPouch = db._collectionsPouch;
  // const docsRes = await colPouch.allDocs();
  // await Promise.all(
  //   docsRes.rows
  //     .map((row) => ({
  //       _id: row.key,
  //       _rev: row.value.rev,
  //     }))
  //     .map((doc) => colPouch.remove(doc._id, doc._rev))
  // );
  await createCollections(db);
  return db;
});

// TODO: when can this fail? How should we retry if it does?
const createCollections = async (db: Database) => {
  await (Object.keys(collections) as Array<keyof Collections>).map(
    async (name) => {
      if (db[name]) {
        return;
      }
      const collectionOpts = collections[name];
      const collection = await db.collection(collectionOpts.creationOpts);
      await collection.sync({
        ...collectionOpts.syncOpts,
        remote: syncURL + dbName + '/',
      });
    }
  );
};
