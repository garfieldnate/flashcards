import React from 'react';
import renderer from 'react-test-renderer';
import AddDeckNotice from './AddDeckNotice';

import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
beforeAll(() => {
  return Font.loadAsync(Ionicons.font);
});

it("renders icon button", () => {
  const tree = renderer.create(
    <AddDeckNotice />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
