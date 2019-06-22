import React from 'react';
import renderer from 'react-test-renderer';
import { mockNavigator } from '../utils/mocks';
import AddDeckNotice from './AddDeckNotice';

import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
beforeAll(() => {
  return Font.loadAsync(Ionicons.font);
});

it('renders icon button', () => {
  const tree = renderer
    .create(<AddDeckNotice navigation={mockNavigator()} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
