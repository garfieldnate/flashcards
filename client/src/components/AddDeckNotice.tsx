import { Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import AddDeckButton from './AddDeckButton';

interface IProps {
  onPress: () => void;
}

export default class AddDeckNotice extends Component<IProps> {
  public render() {
    // using flex to center vertically
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            <Text style={styles.text}>Touch</Text>
          </View>
          <View style={styles.row}>
            <AddDeckButton
              iconStyle={styles.icon}
              onPress={this.props.onPress}
            />
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 36,
  },
  row: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
