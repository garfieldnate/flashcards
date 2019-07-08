import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { err, ok, Result } from 'neverthrow';
import { ImageURISource } from 'react-native';
import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';
import { CollectionOpts } from './CollectionOpts';
import { CardSchema as CardDocType } from './schemata/card';

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

export type CardCollection = RxCollection<
  CardDocType,
  CardDocMethods,
  CardCollectionMethods
>;

export const collectionOpts: CollectionOpts = {
  creationOpts: {
    methods: cardDocMethods,
    name: 'cards',
    schema: cardSchema,
    statics: cardCollectionMethods,
  },
  syncOpts: {
    direction: { pull: true, push: false },
    options: {
      live: true,
      retry: true,
    },
  },
};
