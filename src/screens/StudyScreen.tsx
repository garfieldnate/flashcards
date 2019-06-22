import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import Stage from '../components/Stage';
import StudyManager from '../logic/StudyManager';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface IProps {
  navigation: Navigation,
}

export default class StudyScreen extends React.Component<IProps> {
  public static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('deck', {}).name,
  })
  public studyManager: StudyManager;

  constructor(props: IProps) {
    super(props);
    const deck = this.props.navigation.getParam(
      'deck', 'no deck present in navigation properties!');
    const userData = this.props.navigation.getParam(
      'userData', 'no user data present in navigation properties!');
    this.studyManager = new StudyManager(deck, userData);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Stage studyManager={this.studyManager} />
      </ View>
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
