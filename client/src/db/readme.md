To add a new RxDB collection:

- Create the JSON schema in the schemata directory.
- Run `yarn schema2ts` to get the typescript version of the schema
- Create a file like `CardCollection.ts` that export
  1. the `RxCollection<...>` type and
  2. the `CollectionOpts`
- In `Database.ts`, import from your `*Collection.ts` file and add your collection to
  1. the `DatabaseCollections` type and
  2. the `collections` variable
