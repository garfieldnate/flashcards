import { Button, Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  iconStyle: Icon['props']['style'];
  onPress: () => void;
}

export default class AddDeckButton extends Component<IProps> {
  public render() {
    return (
      <Button transparent style={styles.button} onPress={this.props.onPress}>
        <Icon style={this.props.iconStyle} name='ios-add-circle-outline' />
      </Button>
    );
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
