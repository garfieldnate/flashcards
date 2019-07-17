import { Sound } from 'expo-av/build/Audio';
import { ImageSourcePropType } from 'react-native';
import { ICard } from '../model/Card';
import { loadAudio } from '../utils/Audio';

export type BuiltinCardData = {
  ID: string;
  headwordForeignLang: string;
  headwordUserLang: string;
  exampleForeignLang?: string;
  exampleUserLang?: string;
  category: string;
  // result of require() is a number
  foreignHeadwordAudio: number;
  image: number;
};

export default class BuiltinCard implements ICard {
  private cardData: BuiltinCardData;
  constructor(cardData: BuiltinCardData) {
    this.cardData = cardData;
  }
  public getId(): string {
    return this.cardData.ID;
  }
  public getHeadwordForeignLang(): string {
    return this.cardData.headwordForeignLang;
  }
  public getCategory(): string {
    return this.cardData.category;
  }
  public getExampleForeignLang(): string | undefined {
    return this.cardData.exampleForeignLang;
  }
  public getExampleUserLang(userLang: string): string | undefined {
    // For now we only support English
    return this.cardData.exampleUserLang;
  }
  public getHeadwordUserLang(userLang: string): string {
    // For now we only support English
    return this.cardData.headwordUserLang;
  }
  public async getForeignHeadwordAudio(): Promise<Sound> {
    return loadAudio(this.cardData.foreignHeadwordAudio);
  }
  public getImage(): Promise<ImageSourcePropType> {
    return Promise.resolve(this.cardData.image);
  }
}
