import React from 'react';
import renderer from 'react-test-renderer';
import AddDeckButton from './AddDeckButton';
import { mockNavigator } from '../utils/mocks';

import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native';
beforeAll(() => {
  return Font.loadAsync(Ionicons.font);
});

it('renders icon button', () => {
  const tree = renderer.create((
    <AddDeckButton
      iconStyle={{ fontSize: 36 }}
      navigation={mockNavigator()}
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('navigates to the AddDecks screen when pressed', () => {
  const navigatorMock = mockNavigator();
  const component = renderer.create(
    <AddDeckButton iconStyle={{ fontSize: 36 }} navigation={navigatorMock}/>,
  );

  const rootInstance = component.root;
  const button = rootInstance.findByType(TouchableOpacity);
  button.props.onPress();

  expect(navigatorMock.navigate).toHaveBeenCalledWith(
    'AddDecks', {
      userData:   navigatorMock.state.params.userData,
      deckSource: navigatorMock.state.params.deckSource,
    });
});
