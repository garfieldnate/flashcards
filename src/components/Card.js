// Visual component for a single flashcard
import PropTypes from 'prop-types';
import { Audio } from 'expo';
import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import cardLayout from './CardLayout.js';

import CardFlip from 'react-native-card-flip';

export default class Card extends Component<Props> {
  static propTypes = {
    cardID: PropTypes.number.isRequired,
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    exampleForeignLang: PropTypes.string,
    exampleUserLang: PropTypes.string,
    // result of asset require() is a number
    foreignHeadwordAudio: PropTypes.number
  };

  constructor (props) {
    super(props);
    if(this.props.foreignHeadwordAudio) {
      this.recording = new Audio.Sound();
      this.recording.loadAsync(this.props.foreignHeadwordAudio).
        then(() => {
          this.recordingReady = true;
          console.log(`loaded audio for ${this.props.back}`)
        }).
        catch((error) => {
          console.log(`Couldn't load audio for ${this.props.back}`);
          console.log(error);
        });
    }
  }

  render () {
    return (
        <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
          <View style={[styles.card, styles.cardFront]}>
            {this.renderTopSection(this.props.front)}
            <View style={styles.cardBottomSection} />
          </View>
          <View style={[styles.card, styles.cardBack]} >
            {this.renderTopSection(this.props.back)}
            <View style={styles.cardBottomSection}>
              {this.renderExample()}
            </View>
          </View>
        </CardFlip>
    );
  }

  renderTopSection = (headwordText) => {
    return (
      <View style={{flex: 2, justifyContent: 'flex-end'}}>
        <View style={styles.textContainer} >
          <Text adjustsFontSizeToFit numberOfLines={countLines(headwordText)} style={styles.headword}>{headwordText}</Text>
        </View>
      </View>);
  }

  // Renders the foreign language example, the user's language example,
  // and a separating line between them. Adjusts for missing sentence
  // data by omitting elements as needed.
  renderExample = () => {
    var foreignExample, separator, userLangExample;
    if (!this.props.exampleForeignLang && !this.props.exampleUserLang) {
      return null;
    }

    if(this.props.exampleForeignLang) {
      foreignExample = <Text style={styles.exampleText}>{this.props.exampleForeignLang}</Text>;
    }
    if(this.props.exampleUserLang) {
      userLangExample = <Text style={styles.exampleText}>{this.props.exampleUserLang}</Text>;
    }
    if(foreignExample && userLangExample) {
      separator = <Text style={styles.exampleText}>{'─────'}</Text>;
    }
    return (
      <View style={[styles.textContainer, styles.exampleContainer]}>
        {foreignExample}
        {separator}
        {userLangExample}
      </View>);
  }

  flip = () => {
    if (this.card.state.side === 0) {
      if(this.recording) {
        console.log(`playing recording ${this.props.back}`);
        this.recording.replayAsync().
          catch((error) => {
            console.log("Error while playing mp3");
            console.log(error);
          });
      }
    }
    this.card.flip();
  }
}

const countLines = (text) => {
  return (text.match(/\r?\n/g)||[]).length + 1;
}

const styles = StyleSheet.create({
  cardContainer:{
    flex: 1
  },
  card: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity:0.5,
    overflow: 'hidden',
    ...cardLayout
  },
  cardFront: {
    backgroundColor: '#91CB3E',
  },
  cardBack: {
    backgroundColor: '#84B939',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardBottomSection: {
    flex: 3,
    justifyContent: 'space-around'
  },
  headword: {
    textAlign: 'center',
    fontSize: 55,
    color: '#ffffff',
  },
  exampleContainer: {
    padding: '2%',
    // overflow: 'hidden',
    flexShrink: 1,
  },
  exampleText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  }
});
