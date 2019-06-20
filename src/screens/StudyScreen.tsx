import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Stage from '../components/Stage';
import StudyManager from '../logic/StudyManager';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

type Props = {
  navigation: Navigation,
};

export default class StudyScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.getParam('deck', {}).name,
  })
  studyManager: StudyManager;

  constructor(props) {
    super(props);
    const deck = this.props.navigation.getParam(
      'deck', 'no deck present in navigation properties!');
    const userData = this.props.navigation.getParam(
      'userData', 'no user data present in navigation properties!');
    this.studyManager = new StudyManager(deck, userData);
  }

  render() {
    return (
      <View style={styles.container}>
        <Stage studyManager={this.studyManager} />
      </ View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D1DCE9',
  },
});
