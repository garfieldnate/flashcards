import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Stage from '../components/Stage.js';

export default class StudyScreen extends React.Component {
  static navigationOptions = {
    title: "Turkish - 3"
  }
  render() {
    return (
      <View style={styles.container}>
        <Stage />
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
