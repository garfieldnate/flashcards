import AsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import * as HTTPAdapter from 'pouchdb-adapter-http';
import * as RxDB from 'rxdb';

RxDB.plugin(AsyncStorageAdapter);
RxDB.plugin(HTTPAdapter);

export default RxDB;
