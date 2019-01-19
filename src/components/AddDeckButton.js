import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Icon } from 'native-base';
export default class AddDeckButton extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Button transparent
            style={styles.button}
            onPress={() => navigation.navigate('AddDecks',
              {
                userData:   navigation.state.params.userData,
                deckSource: navigation.state.params.deckSource
              })}>
        <Icon
            style={this.props.iconStyle}
            name="ios-add-circle-outline" />
    </Button>);
  }
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        // without this, the bottom of the icon can get cut off
        paddingTop: 0,
        paddingBottom: 0
    }
});
