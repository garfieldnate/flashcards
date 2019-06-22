import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Icon } from 'native-base';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

type Props = {
  iconStyle: Icon['props']['style'],
  navigation: Navigation,
};

export default class AddDeckButton extends Component<Props> {
  render() {
    return (
      <Button
        transparent
        style={styles.button}
        onPress={this.handlePressed}
      >
        <Icon
          style={this.props.iconStyle}
          name='ios-add-circle-outline'
        />
      </Button>
    );
  }

  handlePressed = () => {
    const navigation = this.props.navigation;
    navigation.navigate(
      'AddDecks',
      {
        userData: navigation.state.params.userData,
        deckSource: navigation.state.params.deckSource,
      });
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    // without this, the bottom of the icon can get cut off
    paddingTop: 0,
    paddingBottom: 0,
  },
});
