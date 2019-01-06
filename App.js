import React from 'react';
import StudyScreen from './src/screens/StudyScreen.js';
import DeckPickerScreen from './src/screens/DeckPickerScreen.js';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    DeckPicker: DeckPickerScreen,
    Study: StudyScreen,
  },
  {
    initialRouteName: "DeckPicker"
  }
);

export default createAppContainer(AppNavigator);
