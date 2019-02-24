import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Icon } from 'native-base';
export default class AddDeckButton extends Component {
  render() {
    return (
      <Button transparent
            style={styles.button}
            onPress={this.handleClicked}>
        <Icon
            style={this.props.iconStyle}
            name="ios-add-circle-outline" />
    </Button>);
  }

  handleClicked = () => {
    const navigation = this.props.navigation;
    navigation.navigate('AddDecks',
      {
        userData:   navigation.state.params.userData,
        deckSource: navigation.state.params.deckSource
      });
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
