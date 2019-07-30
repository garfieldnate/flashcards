import { IObservableValue } from 'mobx';
import { Observer, observer } from 'mobx-react';
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

export type NavParams = { studyManager: StudyManager };

type Navigation = NavigationScreenProp<NavigationState, NavParams>;

const StudyScreen = () => {
  const navigation = useNavigation<NavParams>();
  return (
    <View style={styles.container}>
      <Stage studyManager={navigation.state.params!.studyManager} />
    </View>
  );
};
export default StudyScreen;

const renderRightHeader = (numDue: IObservableValue<number>) => {
  const renderer = () => (
    <Text style={{ color: colors.headerText }}>
      {numDue.get()}
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
  const studyManager: StudyManager = navigation.state.params!.studyManager;
  return {
    headerRight: renderRightHeader(studyManager.getNumDue()),
    title: studyManager.deck.getName(),
  };
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D1DCE9',
    flex: 1,
    justifyContent: 'center',
  },
});
