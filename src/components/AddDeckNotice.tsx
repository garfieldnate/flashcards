import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Body, Row, Text } from 'native-base';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import AddDeckButton from './AddDeckButton';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

type Props = {
  navigation: Navigation,
};

export default class AddDeckNotice extends Component<Props> {
  render() {
    // using flex to center vertically
    return (
      <View style={styles.container}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
  },
  text: {
    fontSize: 24,
  },
});
