import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddDecksScreen from './src/screens/AddDecksScreen';
import ChooseStudyDeckScreen from './src/screens/ChooseStudyDeckScreen';
import StudyScreen from './src/screens/StudyScreen';

import { GlobalAppData } from './src/globals/GlobalAppData';
import { AppGlobalsContext } from './src/globals/GlobalsContext';

import { colors } from './src/screens/Styles';

const Stack = createStackNavigator(
  {
    AddDecks: AddDecksScreen,
    ChooseStudyDeck: ChooseStudyDeckScreen,
    Study: StudyScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.headerBackground,
      },
      // colors the back button and text
      headerTintColor: colors.headerText,
      headerTitleStyle: {
        color: colors.headerText,
      },
    },
    initialRouteName: 'ChooseStudyDeck',
  }
);

const Navigation = createAppContainer(Stack);
const globalAppData = new GlobalAppData();

export default class AppContainer extends Component {
  public render() {
    return (
      <AppGlobalsContext.Provider value={globalAppData}>
        <Navigation />
      </AppGlobalsContext.Provider>
    );
  }
}
