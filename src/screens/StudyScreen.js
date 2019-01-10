import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Stage from '../components/Stage.js';
import CardSource from '../logic/CardSource.js';

export default class StudyScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.getParam('deck', {}).name
  });

  constructor(props) {
    super(props);
    deck = this.props.navigation.getParam('deck', 'no deck present in navigation properties!');
    userData = this.props.navigation.getParam('userData', 'no user data present in navigation properties!');
    this.cardSource = new CardSource(deck, userData);
  }

  render() {
    return (
      <View style={styles.container}>
        <Stage cardSource={this.cardSource}/>
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
