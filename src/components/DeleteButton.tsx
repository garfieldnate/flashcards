import { Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
}

export default class DeleteButton extends Component<IProps> {
  public render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Icon style={styles.icon} name='trash' type='EvilIcons' />
      </TouchableOpacity>
    );
  }
}

const size = 65;
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D95C2E',
    borderColor: '#FAECE7',
    borderRadius: 99999,
    borderWidth: size / 15,
    height: size,
    justifyContent: 'center',
    textAlign: 'center',
    width: size,
  },
  icon: {
    color: '#FAECE7',
    fontSize: 45,
  },
});
