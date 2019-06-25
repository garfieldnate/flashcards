import { Observer } from 'mobx-react';
import { Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Stage from '../components/Stage';
import StudyManager from '../logic/StudyManager';
import { IDeck } from '../model/Deck';
import { colors } from '../screens/Styles';
import DummyUserData from '../userData/DummyUserData';

export type NavParams = { deck: IDeck; userData: DummyUserData };

type Navigation = NavigationScreenProp<NavigationState, NavParams>;

interface IProps {
  navigation: Navigation;
}

const StudyScreen = (props: IProps) => {
  const studyManager = new StudyManager(
    props.navigation.state.params.deck,
    props.navigation.state.params.userData
  );

  return (
    <View style={styles.container}>
      <Stage studyManager={studyManager} />
    </View>
  );
};
export default StudyScreen;

const renderRightHeader = (deck: IDeck) => {
  const renderer = () => (
    <Text style={{ color: colors.headerText }}>
      {deck.cardsDue}
      <Icon
        style={{ color: colors.headerText }}
        type='MaterialCommunityIcons'
        name='cards-outline'
      />
      {'  '}
    </Text>
  );
  return <Observer>{renderer}</Observer>;
};
StudyScreen.navigationOptions = ({
  navigation,
}: {
  navigation: Navigation;
}) => {
  const deck: IDeck = navigation.state.params.deck;
  return {
    headerRight: renderRightHeader(deck),
    title: deck.name,
  };
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D1DCE9',
    flex: 1,
    justifyContent: 'center',
  },
});
