import { Sound } from 'expo-av/build/Audio';
import { Result } from 'neverthrow';
import { ImageURISource } from 'react-native';

export interface ICard {
  getId(): string;
  getHeadwordForeignLang(): string;
  getCategory(): string;
  getExampleForeignLang(): string | undefined;
  getExampleUserLang(userLang: string): string | undefined;
  getHeadwordUserLang(userLang: string): string;
  getForeignHeadwordAudio(): Promise<Result<Sound | undefined, any>>;
  getImage(): Promise<Result<ImageURISource | undefined, any>>;
}
