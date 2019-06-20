import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Body, Row, Text } from 'native-base';

import AddDeckButton from './AddDeckButton.tsx';

export default class AddDeckNotice extends Component {
  render() {
    // using flex to center vertically
    return (
        <View style={styles.container}>
            <View style={{flex: 1}} />
            <View style={{flex: 1}}>
                <View style={styles.row}>
                  <Text style={styles.text}>Touch</Text>
                </View>
                <View style={styles.row}>
                  <AddDeckButton iconStyle={styles.icon} navigation={this.props.navigation} />
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>to add a deck</Text>
                </View>
            </View>
            <View style={{flex: 1}} />
        </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    alignItems: 'center'
  },
  icon: {
    fontSize: 36
  },
  text: {
    fontSize: 24
  }
});
