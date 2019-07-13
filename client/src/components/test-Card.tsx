// import React from 'react';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ICard } from '../model/Card';
import Card from './Card';

class DummyCard implements ICard {
  public getId(): string {
    return '1';
  }
  public getHeadwordForeignLang(): string {
    return 'ハロー';
  }
  public getCategory(): string {
    return 'foo';
  }
  public getExampleForeignLang(): string | undefined {
    return '例文';
  }
  public getExampleUserLang(userLang: string): string | undefined {
    return 'example';
  }
  public getHeadwordUserLang(userLang: string): string {
    return 'hello';
  }
  public getForeignHeadwordAudio(): Promise<
    import('expo-av/build/Audio').Sound | undefined
  > {
    return Promise.resolve(undefined);
  }
  public getImage(): Promise<
    | number
    | import('react-native').ImageURISource
    | Array<import('react-native').ImageURISource>
    | undefined
  > {
    return Promise.resolve(undefined);
  }
}

it('renders a card', () => {
  const tree = renderer
    .create(<Card cardData={new DummyCard()} onDelete={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
