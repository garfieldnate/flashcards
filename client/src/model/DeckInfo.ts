import { ImageSourcePropType } from 'react-native';
import { Optional } from 'typescript-optional';
import { CardId, ICard } from './Card';

export interface IDeckInfo {
  getId(): string;
  getName(): string;
  getThumbnail(): ImageSourcePropType;
  getPresentationOrder(): CardId[];
  /**
   *
   * @param id of card to retrieve
   * @returns the card if it is built-in, or undefined if it is not
   */
  getBuiltin(id: CardId): Optional<ICard>;
}
