import { Observer } from 'mobx-react';
import { Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
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

export default class StudyScreen extends React.Component<IProps> {
  public static navigationOptions = ({
    navigation,
  }: {
    navigation: Navigation;
  }) => {
    const deck: IDeck = navigation.state.params.deck;
    return {
      headerRight: StudyScreen.renderRightHeader(deck),
      title: deck.name,
    };
  };
  private static renderRightHeader = (deck: IDeck) => {
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

  public studyManager: StudyManager;

  constructor(props: IProps) {
    super(props);
    const deck: IDeck = this.props.navigation.state.params.deck;
    const userData = this.props.navigation.state.params.userData;
    this.studyManager = new StudyManager(deck, userData);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Stage studyManager={this.studyManager} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D1DCE9',
    flex: 1,
    justifyContent: 'center',
  },
});
