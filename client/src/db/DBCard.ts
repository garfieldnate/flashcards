import { Sound } from 'expo-av/build/Audio';
import { ImageSourcePropType } from 'react-native';
import { ICard } from '../model/Card';
import { CardDocument } from './CardCollection';

export default class DBCard implements ICard {
  public doc: CardDocument;
  constructor(doc: CardDocument) {
    this.doc = doc;
  }
  public getId(): string {
    return this.doc.id;
  }
  public getHeadwordForeignLang(): string {
    return this.doc.headwordForeignLang;
  }
  public getCategory(): string {
    return this.doc.category;
  }
  public getExampleForeignLang(): string | undefined {
    return this.doc.exampleForeignLang;
  }
  public getExampleUserLang(userLang: string): string | undefined {
    if (this.doc.exampleUserLang) {
      // TODO: use user's language here
      return this.doc.exampleUserLang.english;
    }
    return undefined;
  }
  public getHeadwordUserLang(userLang: string): string {
    // TODO: use user's language here
    return this.doc.headwordUserLang.english;
  }
  public getForeignHeadwordAudio(): Promise<Sound | undefined> {
    return this.doc.getForeignHeadwordAudio();
  }
  public getImage(): Promise<ImageSourcePropType | undefined> {
    return this.doc.getImage();
  }
}
