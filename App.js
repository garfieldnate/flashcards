import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from './src/components/Card.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={() => this.card.flip()} >
        <Card front="สวัสดี"
              back= "hello"
              ref={(card) => this.card = card} />
      </ TouchableOpacity>
      </ View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
