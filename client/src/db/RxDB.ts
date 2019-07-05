import * as RxDB from 'rxdb';

RxDB.plugin(require('pouchdb-adapter-asyncstorage').default);
RxDB.plugin(require('pouchdb-adapter-http'));

export default RxDB;
