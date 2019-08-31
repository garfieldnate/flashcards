import { Sound } from 'expo-av/build/Audio';
import { ImageURISource } from 'react-native';
import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';
import { Optional } from 'typescript-optional';
import { ICard } from '../model/Card';
import { loadAudio } from '../utils/Audio';
import { CollectionOpts } from './CollectionOpts';
import DBCard from './DBCard';
import { CardSchema as CardDocType } from './schemata/card';
import {
  FOREIGN_HEADWORD_AUDIO_ATTACHMENT,
  IMAGE_ATTACHMENT,
} from './schemata/constants';

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
    // const attachments = await this.allAttachments();
    // console.log(`num attachments: ${attachments.length}`);
    console.log('getting attachment...');
    const attachment = await this.getAttachment(
      FOREIGN_HEADWORD_AUDIO_ATTACHMENT
    );
    if (!attachment) {
      console.log(`No audio attachment found for ${this.id}`);
      return Optional.empty();
    }
    const dataBlob = await attachment.getData();
    console.log('successfully got data from attachment');
    const sound = await loadAudio({ uri: 'data:image/png;base64,' + dataBlob });
    if (!sound) {
      console.log("Couldn't load sound");
    }
    return Optional.of(sound);
  },
  async getImage(this: CardDocument) {
    const attachment = await this.getAttachment(IMAGE_ATTACHMENT);
    if (!attachment) {
      return Optional.empty();
    }
    const dataBlob = await attachment.getData();

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
