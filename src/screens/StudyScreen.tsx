import { Observer } from 'mobx-react';
import { Icon, Text } from 'native-base';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Stage from '../components/Stage';
import { AppGlobalsContext } from '../globals/GlobalsContext';
import StudyManager from '../logic/StudyManager';
import { IDeck } from '../model/Deck';
import { colors } from '../screens/Styles';

export type NavParams = { deck: IDeck };

type Navigation = NavigationScreenProp<NavigationState, NavParams>;

interface IProps {
  navigation: Navigation;
}

const StudyScreen = (props: IProps) => {
  const globals = useContext(AppGlobalsContext);

  const studyManager = new StudyManager(
    props.navigation.state.params.deck,
    globals.userData
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
