import React from 'react';
import StudyScreen from './src/screens/StudyScreen';
import ChooseStudyDeckScreen from './src/screens/ChooseStudyDeckScreen';
import AddDecksScreen from './src/screens/AddDecksScreen';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import DummyUserData from './src/userData/DummyUserData';
import DummyDeckSource from './src/builtinData/DummyDeckSource';

const userData = new DummyUserData();
const deckSource = new DummyDeckSource();

const AppNavigator = createStackNavigator(
  {
    ChooseStudyDeck: ChooseStudyDeckScreen,
    AddDecks: AddDecksScreen,
    Study: StudyScreen,
  },
  {
    initialRouteName: 'ChooseStudyDeck',
    initialRouteParams: { userData, deckSource },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(26, 84, 147, 1)',
      },
      headerTitleStyle: {
        color: '#D1DCE9',
      },
      // colors the back button and text
      headerTintColor: '#D1DCE9',
    },
  }
);

export default createAppContainer(AppNavigator);
