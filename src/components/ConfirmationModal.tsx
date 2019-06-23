import { Button, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

interface IProps {
  message: string;
  confirmMessage: string;
  rejectMessage: string;
  onConfirm: () => void;
  onReject: () => void;
  isVisible: boolean;
}

export default class ConfirmationModal extends Component<IProps> {
  public render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onReject}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.message}</Text>
          <Button danger onPress={this.props.onConfirm} style={styles.buttons}>
            <Text>{this.props.confirmMessage}</Text>
          </Button>
          <Button primary onPress={this.props.onReject} style={styles.buttons}>
            <Text>{this.props.rejectMessage}</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    alignSelf: 'center',
    marginTop: 22,
  },
  container: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
