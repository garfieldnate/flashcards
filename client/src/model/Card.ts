import { Sound } from 'expo-av/build/Audio';
import { ImageSourcePropType } from 'react-native';

export interface ICard {
  getId(): string;
  getHeadwordForeignLang(): string;
  getCategory(): string;
  getExampleForeignLang(): string | undefined;
  getExampleUserLang(userLang: string): string | undefined;
  getHeadwordUserLang(userLang: string): string;
  getForeignHeadwordAudio(): Promise<Sound | undefined>;
  getImage(): Promise<ImageSourcePropType | undefined>;
}
