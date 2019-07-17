// import React from 'react';
import { Sound } from 'expo-av/build/Audio';
import * as React from 'react';
import { ImageSourcePropType, ImageURISource } from 'react-native';
import * as renderer from 'react-test-renderer';
import { Optional } from 'typescript-optional';
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
  public getExampleForeignLang() {
    return Optional.of('例文');
  }
  public getExampleUserLang(userLang: string) {
    return Optional.of('example');
  }
  public getHeadwordUserLang(userLang: string): string {
    return 'hello';
  }
  public getForeignHeadwordAudio(): Promise<Optional<Sound>> {
    return Promise.resolve(Optional.empty());
  }
  public getImage(): Promise<Optional<ImageSourcePropType>> {
    return Promise.resolve(Optional.empty());
  }
}

it('renders a card', () => {
  const tree = renderer
    .create(<Card cardData={new DummyCard()} onDelete={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
