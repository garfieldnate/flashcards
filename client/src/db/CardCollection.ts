import { Sound } from 'expo-av/build/Audio';
import { ImageURISource } from 'react-native';
import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';
import { Optional } from 'typescript-optional';
import { ICard } from '../model/Card';
import { loadAudio } from '../utils/Audio';
import { CollectionOpts } from './CollectionOpts';
import DBCard from './DBCard';
import { CardSchema as CardDocType } from './schemata/card';

// TypeScript can't give the correct type if we import and *then* type annotate
// tslint:disable-next-line: no-var-requires
const cardSchema: RxJsonSchema<CardDocType> = require('./schemata/card.json');
type CardDocMethods = {
  getForeignHeadwordAudio: () => Promise<Optional<Sound>>;
  getImage: () => Promise<Optional<ImageURISource>>;
};
export type CardDocument = RxDocument<CardDocType, CardDocMethods>;

const cardDocMethods: CardDocMethods = {
  async getForeignHeadwordAudio(this: CardDocument) {
    const attachment = await this.getAttachment('foreignHeadwordAudio');
    if (!attachment) {
      return Optional.empty();
    }
    const dataBlob = attachment.getData();
    const sound = await loadAudio({ uri: URL.createObjectURL(dataBlob) });
    return Optional.of(sound);
  },
  async getImage(this: CardDocument) {
    const attachment = await this.getAttachment('image');
    if (!attachment) {
      return Optional.empty();
    }
    const dataBlob = attachment.getData();
    return Optional.of({ uri: URL.createObjectURL(dataBlob) });
  },
};
type CardCollectionMethods = {
  getCardsById: (this: CardCollection, ids: string[]) => Promise<ICard[]>;
};
const cardCollectionMethods: CardCollectionMethods = {
  async getCardsById(this: CardCollection, ids: string[]): Promise<ICard[]> {
    const query = this.find()
      .where('id')
      .in(ids);
    const docs = await query.exec();
    return docs.map((d) => new DBCard(d));
  },
};

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
