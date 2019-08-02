import { RxDatabase } from 'rxdb';
import {
  CardCollection,
  collectionOpts as cardCollectionOpts,
} from './CardCollection';
import { CollectionOpts } from './CollectionOpts';
import RxDB from './RxDB';

// TODO: this has to be parameterized for dev/prod
const syncURL = 'http://localhost:5984/';
const dbName = 'flashcards2';

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
  // console.log(RxDB.PouchDB);
  // RxDB.PouchDB.debug.enable('*');
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
  db.$.subscribe((changeEvent) =>
    console.log(`changeEvent: ${JSON.stringify(changeEvent)}`)
  );
  return db;
});

// TODO: when can this fail? How should we retry if it does?
const createCollections = async (db: Database) => {
  await (Object.keys(collections) as Array<keyof Collections>).map(
    async (name) => {
      if (db[name]) {
        console.log(`db name already found: ${db[name]}`);
        return;
      }
      const collectionOpts = collections[name];
      const collection = await db.collection(collectionOpts.creationOpts);
      const replicationState = await collection.sync({
        ...collectionOpts.syncOpts,
        remote: syncURL + dbName + '/',
      });
      replicationState.change$.subscribe((change) =>
        console.log(`change: ${change}`)
      );
      replicationState.docs$.subscribe((docData) =>
        console.log(`docData: ${docData}`)
      );
      replicationState.denied$.subscribe((docData) =>
        console.log(`docData: ${docData}`)
      );
      replicationState.active$.subscribe((active) =>
        console.log(`active: ${active}`)
      );
      replicationState.alive$.subscribe((alive) =>
        console.log(`alive: ${alive}`)
      );
      replicationState.complete$.subscribe((completed) =>
        console.log(`completed: ${completed}`)
      );
      replicationState.error$.subscribe((error) =>
        console.log(`error: ${error}`)
      );
    }
  );
};
