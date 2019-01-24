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
    exampleForeignLang: PropTypes.string.isRequired,
    exampleUserLang: PropTypes.string.isRequired,
  };
  render() {
    return (
        <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
          <View style={[styles.card, styles.card1]}>
            <View style={{flex: 1}} />
            <View style={styles.textContainer} >
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.headword}>{this.props.front}</Text>
            </View>
            <View style={{flex: 3}} />
          </View>
          <View style={[styles.card, styles.card2]} >
            <View style={{flex: 1}} />
            <View style={styles.textContainer} >
              <Text adjustsFontSizeToFit numberOfLines={2} style={styles.headword}>{this.props.back}</Text>
            </View>
            <View style={{flex: 3}}>
              <View style={{flex: 1}} />
              <View style={[styles.textContainer, styles.exampleContainer]}>
                <Text style={styles.example}>{this.props.exampleForeignLang}</Text>
                <Text style={styles.example}>{'─────'}</Text>
                <Text style={styles.example}>{this.props.exampleUserLang}{''}</Text>
              </View>
              <View style={{flex: 1}} />
            </View>
          </View>
        </CardFlip>
    );
  }
  flip = () => this.card.flip();
}

const styles = StyleSheet.create({
  cardContainer:{
    flex: 1
  },
  card:{
    width: "100%",
    height: "85%",
    borderColor: "white",
    borderWidth: 10,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
  },
  card1: {
    backgroundColor: 'rgba(83, 165, 72, 1)',
  },
  card2: {
    backgroundColor: 'rgba(145, 203, 62, 1)',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headword: {
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'System',
    color: '#ffffff',
  },
  exampleContainer: {
    padding: '2%',
    // overflow: 'hidden',
    flexShrink: 1,
  },
  example: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'System',
    color: '#FFFFFF',
  }
});
