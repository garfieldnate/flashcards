import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddDecksScreen from './src/screens/AddDecksScreen';
import ChooseStudyDeckScreen from './src/screens/ChooseStudyDeckScreen';
import StudyScreen from './src/screens/StudyScreen';

import DummyDeckSource from './src/builtinData/DummyDeckSource';
import DummyUserData from './src/userData/DummyUserData';

import { colors } from './src/screens/Styles';

const userData = new DummyUserData();
const deckSource = new DummyDeckSource();

const AppNavigator = createStackNavigator(
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
    initialRouteParams: { userData, deckSource },
  }
);

export default createAppContainer(AppNavigator);
