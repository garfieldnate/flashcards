import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Stage from './src/components/Stage.js';

export default class App extends React.Component {
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
