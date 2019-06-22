import { Button, Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

type Navigation = NavigationScreenProp<NavigationState>;

interface IProps {
  iconStyle: Icon['props']['style'],
  navigation: Navigation,
}

export default class AddDeckButton extends Component<IProps> {
  public render() {
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

  public handlePressed = () => {
    const navigation = this.props.navigation;
    navigation.navigate(
      'AddDecks',
      {
        deckSource: navigation.state.params.deckSource,
        userData: navigation.state.params.userData,
      });
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    paddingBottom: 0,
    // without this, the bottom of the icon can get cut off
    paddingTop: 0,
  },
});
