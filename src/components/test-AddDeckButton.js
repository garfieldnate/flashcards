import React from 'react';
import renderer from 'react-test-renderer';
import AddDeckButton from './AddDeckButton.tsx';

import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
beforeAll(() => {
  return Font.loadAsync(Ionicons.font);
});

it("renders icon button", () => {
  const tree = renderer.create(
    <AddDeckButton iconStyle={{fontSize: 36}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it("navigates to the AddDecks screen when pressed", () => {
  const mockNavigator = {
    navigate: jest.fn(),
    state: {
      params: {
        userData: "foo",
        deckSource: "bar",
      }
    }
  };
  const component = renderer.create(
    <AddDeckButton iconStyle={{fontSize: 36}} navigation={mockNavigator}/>
  );

  // TODO: would be better if we could trigger an actual button click
  component.getInstance().handleClicked();
  expect(mockNavigator.navigate).toHaveBeenCalledWith(
    "AddDecks", {
      userData:   mockNavigator.state.params.userData,
      deckSource: mockNavigator.state.params.deckSource
  });
})
