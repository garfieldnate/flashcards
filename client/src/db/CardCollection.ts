import { Sound } from 'expo-av/build/Audio';
import { err, ok, Result } from 'neverthrow';
import { ImageURISource } from 'react-native';
import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';
import { loadAudio } from '../utils/Audio';
import { CollectionOpts } from './CollectionOpts';
import { CardSchema as CardDocType } from './schemata/card';

// TypeScript can't give the correct type if we import and *then* type annotate
// tslint:disable-next-line: no-var-requires
const cardSchema: RxJsonSchema<CardDocType> = require('./schemata/card.json');
type CardDocMethods = {
  getForeignHeadwordAudio: () => Promise<Sound | undefined>;
  getImage: () => Promise<ImageURISource | undefined>;
};
type CardDocument = RxDocument<CardDocType, CardDocMethods>;

const cardDocMethods: CardDocMethods = {
  async getForeignHeadwordAudio(this: CardDocument) {
    const attachment = await this.getAttachment('foreignHeadwordAudio');
    if (!attachment) {
      return undefined;
    }
    const dataBlob = attachment.getData();
    const sound = await loadAudio({ uri: URL.createObjectURL(dataBlob) });
    return sound;
  },
  async getImage(this: CardDocument) {
    const attachment = await this.getAttachment('image');
    if (!attachment) {
      return undefined;
    }
    const dataBlob = attachment.getData();
    return { uri: URL.createObjectURL(dataBlob) };
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
