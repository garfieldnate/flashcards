import AsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import * as HTTPAdapter from 'pouchdb-adapter-http';
import * as RxDB from 'rxdb';

RxDB.plugin(HTTPAdapter);
RxDB.plugin(AsyncStorageAdapter);

// TODO: only run in DEV environment
const pouchdbDebug = require('pouchdb-debug');
RxDB.plugin(pouchdbDebug);
RxDB.PouchDB.debug.enable('*');
console.log('turned on debugging for pouchdb, I think');

export default RxDB;
