// Visual component for a single flashcard
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import CardFlip from 'react-native-card-flip';

export default class Card extends Component<Props> {
  static propTypes = {
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
  };
  render() {
    return (
        <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
          <View style={[styles.card, styles.card1]}>
            <Text style={styles.label}>{this.props.front}</Text>
          </View>
          <View style={[styles.card, styles.card2]} >
            <Text style={styles.label}>{this.props.back}</Text>
          </View>
        </CardFlip>
    );
  }
  flip = () => this.card.flip();
}

const styles = StyleSheet.create({
  cardContainer:{
    width: 320,
    height: 470,
  },
  card:{
    width: 320,
    height: 470,
    backgroundColor: '#FE474C',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  label: {
    lineHeight: 470,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
