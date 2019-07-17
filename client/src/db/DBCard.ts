import { Sound } from 'expo-av/build/Audio';
import { ImageSourcePropType } from 'react-native';
import { Optional } from 'typescript-optional';
import { ICard } from '../model/Card';
import { CardDocument } from './CardCollection';

export default class DBCard implements ICard {
  constructor(public doc: CardDocument) {}
  public getId(): string {
    return this.doc.id;
  }
  public getHeadwordForeignLang(): string {
    return this.doc.headwordForeignLang;
  }
  public getCategory(): string {
    return this.doc.category;
  }
  public getExampleForeignLang(): Optional<string> {
    return Optional.ofNullable(this.doc.exampleForeignLang);
  }
  public getExampleUserLang(userLang: string): Optional<string> {
    if (this.doc.exampleUserLang) {
      // TODO: use user's language here
      return Optional.of(this.doc.exampleUserLang.english);
    }
    return Optional.empty();
  }
  public getHeadwordUserLang(userLang: string): string {
    // TODO: use user's language here
    return this.doc.headwordUserLang.english;
  }
  public getForeignHeadwordAudio(): Promise<Optional<Sound>> {
    return this.doc.getForeignHeadwordAudio();
  }
  public getImage(): Promise<Optional<ImageSourcePropType>> {
    return this.doc.getImage();
  }
}
