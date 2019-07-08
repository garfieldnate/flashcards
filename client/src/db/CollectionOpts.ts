import RxDB from './RxDB';
export type CollectionOpts = {
  creationOpts: RxDB.RxCollectionCreator;
  syncOpts: Partial<RxDB.SyncOptions>;
};
