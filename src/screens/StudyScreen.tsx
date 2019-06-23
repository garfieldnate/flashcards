import { Observer } from 'mobx-react/native';
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
import { Deck } from '../model/Deck';
import { colors } from '../screens/Styles';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface IProps {
  navigation: Navigation;
}

export default class StudyScreen extends React.Component<IProps> {
  public static navigationOptions = ({ navigation }) => {
    const deck: Deck = navigation.getParam(
      'deck',
      'no deck present in navigation properties!'
    );
    return {
      headerRight: StudyScreen.renderRightHeader(deck),
      title: navigation.getParam('deck', {}).name,
    };
  };
  private static renderRightHeader = (deck) => {
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
    const deck: Deck = this.props.navigation.getParam(
      'deck',
      'no deck present in navigation properties!'
    );
    const userData = this.props.navigation.getParam(
      'userData',
      'no user data present in navigation properties!'
    );
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
