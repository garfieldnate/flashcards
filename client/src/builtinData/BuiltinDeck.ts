import { ImageSourcePropType } from 'react-native';
import { CardId, ICard } from '../model/Card';
import { IDeckInfo } from '../model/DeckInfo';

export type BuiltinDeckData = {
  ID: string;
  builtinCards: ICard[];
  name: string;
  thumbnail: number;
  presentationOrder: CardId[];
};

export class BuiltinDeckInfo implements IDeckInfo {
  private data: BuiltinDeckData;
  private builtinCards: Map<string, ICard>;
  constructor(data: BuiltinDeckData) {
    this.data = data;
    this.builtinCards = data.builtinCards.reduce((map, c) => {
      map.set(c.getId(), c);
      return map;
    }, new Map<CardId, ICard>());
  }
  public getId(): string {
    return this.data.ID;
  }
  public getName(): string {
    return this.data.name;
  }
  public getThumbnail(): ImageSourcePropType {
    return this.data.thumbnail;
  }
  public getPresentationOrder(): string[] {
    return this.data.presentationOrder;
  }
  public isBuiltin(id: string): boolean {
    return this.builtinCards.has(id);
  }
  public getBuiltin(id: string): ICard | undefined {
    return this.builtinCards.get(id);
  }
}
