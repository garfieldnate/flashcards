import { err, ok, Result } from 'neverthrow';
import { ImageSourcePropType, ImageURISource } from 'react-native';
import { ICard } from '../model/Card';
import { loadAudio } from '../utils/Audio';

type BuiltinCardData = {
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
  public async getForeignHeadwordAudio(): Promise<
    Result<import('expo-av/build/Audio').Sound, any>
  > {
    try {
      const sound = await loadAudio(this.cardData.foreignHeadwordAudio);
      return ok(sound);
  }
  public getImage(): Promise<Result<ImageSourcePropType, any>> {
    return Promise.resolve(ok(this.cardData.image));
  }
}
