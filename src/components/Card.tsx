// Visual component for a single flashcard
import { Audio } from 'expo-av';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card as CardData } from '../model/Card';
import cardLayout from './CardLayout';

import { Sound } from 'expo-av/build/Audio';
import CardFlip from 'react-native-card-flip';
import DeleteButton from './DeleteButton';

interface IProps {
  cardData: CardData;
  firstTimeSeen?: boolean;
  onDelete: (cardData: CardData) => void;
}

export default class Card extends Component<IProps> {
  public recording: Sound;
  public recordingReady: boolean;
  public card: CardFlip;

  constructor(props) {
    super(props);
    if (this.props.cardData.foreignHeadwordAudio) {
      this.recording = new Audio.Sound();
      this.recording
        .loadAsync(this.props.cardData.foreignHeadwordAudio)
        .then(() => {
          this.recordingReady = true;
          // console.log(`loaded audio for ${this.props.cardData.back}`);
        })
        .catch((error) => {
          // console.log(`Couldn't load audio for ${this.props.cardData.back}`);
          // console.log(error);
        });
    }
  }

  public render() {
    const onDelete = () => this.props.onDelete(this.props.cardData);
    return (
      <CardFlip
        style={styles.cardContainer}
        ref={(card: CardFlip) => (this.card = card)}
      >
        <View style={[styles.card, styles.cardFront]}>
          <View style={styles.deleteButton}>
            <DeleteButton onPress={onDelete} />
          </View>
          {this.renderTopSection(this.props.cardData.front)}
          <View style={styles.cardBottomSection} />
        </View>
        <View style={[styles.card, styles.cardBack]}>
          {this.renderTopSection(this.props.cardData.back)}
          <View style={styles.cardBottomSection}>{this.renderExample()}</View>
        </View>
      </CardFlip>
    );
  }

  public renderTopSection = (headwordText) => {
    return (
      <View style={{ flex: 2, justifyContent: 'flex-end' }}>
        <View style={styles.textContainer}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={countLines(headwordText)}
            style={styles.headword}
          >
            {headwordText}
          </Text>
        </View>
      </View>
    );
  };

  // Renders the foreign language example, the user's language example,
  // and a separating line between them. Adjusts for missing sentence
  // data by omitting elements as needed.
  public renderExample = () => {
    let foreignExample: JSX.Element;
    let separator: JSX.Element;
    let userLangExample: JSX.Element;
    if (
      !this.props.cardData.exampleForeignLang &&
      !this.props.cardData.exampleUserLang
    ) {
      return null;
    }

    if (this.props.cardData.exampleForeignLang) {
      foreignExample = (
        <Text style={styles.exampleText}>
          {this.props.cardData.exampleForeignLang}
        </Text>
      );
    }
    if (this.props.cardData.exampleUserLang) {
      userLangExample = (
        <Text style={styles.exampleText}>
          {this.props.cardData.exampleUserLang}
        </Text>
      );
    }
    if (foreignExample && userLangExample) {
      separator = <Text style={styles.exampleText}>{'─────'}</Text>;
    }
    return (
      <View style={[styles.textContainer, styles.exampleContainer]}>
        {foreignExample}
        {separator}
        {userLangExample}
      </View>
    );
  };

  public flip = () => {
    if (this.card.state.side === 0) {
      if (this.recording) {
        // console.log(`playing recording ${this.props.cardData.back}`);
        this.recording.replayAsync().catch((error) => {
          // console.log('Error while playing mp3');
          // console.log(error);
        });
      }
    }
    this.card.flip();
  };
}

const countLines = (text) => {
  return (text.match(/\r?\n/g) || []).length + 1;
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.5,
    ...cardLayout,
  },
  cardBack: {
    backgroundColor: '#84B939',
  },
  cardBottomSection: {
    flex: 3,
    justifyContent: 'space-around',
  },
  cardContainer: {
    flex: 1,
  },
  cardFront: {
    backgroundColor: '#91CB3E',
  },
  deleteButton: {
    // flex: 1,
    zIndex: 99999,
    left: 5,
    position: 'absolute',
    top: 5,
  },
  exampleContainer: {
    flexShrink: 1,
    padding: '2%',
    // overflow: 'hidden',
  },
  exampleText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  headword: {
    color: '#ffffff',
    fontSize: 55,
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
