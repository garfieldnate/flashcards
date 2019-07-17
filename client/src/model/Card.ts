import { Sound } from 'expo-av/build/Audio';
import { ImageSourcePropType } from 'react-native';
import { Optional } from 'typescript-optional';

export type CardId = string;

export interface ICard {
  getId(): CardId;
  getHeadwordForeignLang(): string;
  getCategory(): string;
  getExampleForeignLang(): Optional<string>;
  getExampleUserLang(userLang: string): Optional<string>;
  getHeadwordUserLang(userLang: string): string;
  getForeignHeadwordAudio(): Promise<Optional<Sound>>;
  getImage(): Promise<Optional<ImageSourcePropType>>;
}
