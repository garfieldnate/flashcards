import React from 'react';
import StudyScreen from './src/screens/StudyScreen.js';
import ChooseStudyDeckScreen from './src/screens/ChooseStudyDeckScreen.js';
import AddDecksScreen from './src/screens/AddDecksScreen.js';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    ChooseStudyDeck: ChooseStudyDeckScreen,
    AddDecks: AddDecksScreen,
    Study: StudyScreen,
  },
  {
    initialRouteName: "ChooseStudyDeck"
  }
);

export default createAppContainer(AppNavigator);
