import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Stage from '../components/Stage.js';
import StudyManager from '../logic/StudyManager.js';

export default class StudyScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.getParam('deck', {}).name
  });

  constructor(props) {
    super(props);
    deck = this.props.navigation.getParam('deck', 'no deck present in navigation properties!');
    userData = this.props.navigation.getParam('userData', 'no user data present in navigation properties!');
    this.studyManager = new StudyManager(deck, userData);
  }

  render() {
    return (
      <View style={styles.container}>
        <Stage studyManager={this.studyManager}/>
      </ View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
