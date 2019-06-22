import { createAppContainer, createStackNavigator } from 'react-navigation';
import AddDecksScreen from './src/screens/AddDecksScreen';
import ChooseStudyDeckScreen from './src/screens/ChooseStudyDeckScreen';
import StudyScreen from './src/screens/StudyScreen';

import DummyDeckSource from './src/builtinData/DummyDeckSource';
import DummyUserData from './src/userData/DummyUserData';

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
        backgroundColor: 'rgba(26, 84, 147, 1)',
      },
      // colors the back button and text
      headerTintColor: '#D1DCE9',
      headerTitleStyle: {
        color: '#D1DCE9',
      },
    },
    initialRouteName: 'ChooseStudyDeck',
    initialRouteParams: { userData, deckSource },
  }
);

export default createAppContainer(AppNavigator);
