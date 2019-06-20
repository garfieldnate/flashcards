import React from 'react';
import StudyScreen from './src/screens/StudyScreen.js';
import ChooseStudyDeckScreen from './src/screens/ChooseStudyDeckScreen.js';
import AddDecksScreen from './src/screens/AddDecksScreen.js';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import DummyUserData from './src/userData/DummyUserData.js';
import DummyDeckSource from './src/builtinData/DummyDeckSource.js';

const userData = new DummyUserData();
const deckSource = new DummyDeckSource();


const AppNavigator = createStackNavigator(
  {
    ChooseStudyDeck: ChooseStudyDeckScreen,
    AddDecks: AddDecksScreen,
    Study: StudyScreen
  },
  {
    initialRouteName: "ChooseStudyDeck",
    initialRouteParams: {userData: userData, deckSource: deckSource},
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'rgba(26, 84, 147, 1)',
      },
      headerTitleStyle: {
        color: "#D1DCE9"
      },
      // colors the back button and text
      headerTintColor: '#D1DCE9',
    }
  }
);

export default createAppContainer(AppNavigator);
