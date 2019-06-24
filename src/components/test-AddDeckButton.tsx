import React from 'react';
import renderer from 'react-test-renderer';
import AddDeckButton from './AddDeckButton';

import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native';
beforeAll(() => {
  return Font.loadAsync(Ionicons.font);
});

it('renders icon button', () => {
  const tree = renderer
    .create(<AddDeckButton iconStyle={{ fontSize: 36 }} onPress={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onPress property when pressed', () => {
  let onPressCounter = 0;
  const onPress = () => (onPressCounter += 1);
  const component = renderer.create(
    <AddDeckButton iconStyle={{ fontSize: 36 }} onPress={onPress} />
  );

  const rootInstance = component.root;
  const button = rootInstance.findByType(TouchableOpacity);
  button.props.onPress();

  expect(onPressCounter).toEqual(1);
});
