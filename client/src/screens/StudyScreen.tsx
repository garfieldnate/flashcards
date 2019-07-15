import { Observer } from 'mobx-react';
import { Icon, Text } from 'native-base';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Stage from '../components/Stage';
import { AppGlobalsContext } from '../globals/GlobalsContext';
import { IGlobalAppData } from '../globals/IGlobalAppData';
import { useNavigation } from '../globals/NavigationUtils';
import StudyManager from '../logic/StudyManager';
import { IDeckInfo } from '../model/DeckInfo';
import { colors } from '../screens/Styles';

export type NavParams = { deck: IDeckInfo; numDue: number };

type Navigation = NavigationScreenProp<NavigationState, NavParams>;

const StudyScreen = () => {
  const globals: IGlobalAppData = useContext(AppGlobalsContext);
  const navigation = useNavigation<NavParams>();

  const studyManager = new StudyManager(
    navigation.state.params!.deck,
    globals.userData
  );

  return (
    <View style={styles.container}>
      <Stage studyManager={studyManager} />
    </View>
  );
};
export default StudyScreen;

const renderRightHeader = (numDue: number) => {
  const renderer = () => (
    <Text style={{ color: colors.headerText }}>
      {numDue}
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
  const deck: IDeckInfo = navigation.state.params.deck;
  const numDue = navigation.state.params.numDue;
  return {
    headerRight: renderRightHeader(numDue),
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
