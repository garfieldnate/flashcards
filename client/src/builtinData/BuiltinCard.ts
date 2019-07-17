import { Sound } from 'expo-av/build/Audio';
import { ImageSourcePropType } from 'react-native';
import { Optional } from 'typescript-optional';
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
  constructor(private cardData: BuiltinCardData) {}
  public getId(): string {
    return this.cardData.ID;
  }
  public getHeadwordForeignLang(): string {
    return this.cardData.headwordForeignLang;
  }
  public getCategory(): string {
    return this.cardData.category;
  }
  public getExampleForeignLang(): Optional<string> {
    return Optional.ofNullable(this.cardData.exampleForeignLang);
  }
  public getExampleUserLang(userLang: string): Optional<string> {
    // For now we only support English
    return Optional.ofNullable(this.cardData.exampleUserLang);
  }
  public getHeadwordUserLang(userLang: string): string {
    // For now we only support English
    return this.cardData.headwordUserLang;
  }
  public async getForeignHeadwordAudio(): Promise<Optional<Sound>> {
    return loadAudio(this.cardData.foreignHeadwordAudio).then((s) => {
      return Optional.of(s);
    });
  }
  public getImage(): Promise<Optional<ImageSourcePropType>> {
    return Promise.resolve(Optional.of(this.cardData.image));
  }
}
