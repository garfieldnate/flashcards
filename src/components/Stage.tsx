// The main animated learning area of the app

import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { observer } from 'mobx-react';
import { Dimensions, Button, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import Card from './Card';
import cardLayout from './CardLayout';
import createArrayToFunctionProxy from '../utils/CreateArrayToFunctionProxy.js';
import StudyManager from '../logic/StudyManager';

const { height, width } = Dimensions.get('window');
const STACK_SIZE = 3;

type Props = {
  studyManager: StudyManager,
};

type State = {
  cardData,
  renderedCards: Card[],
  swipedAllCards: boolean,
};

@observer
class Stage extends Component<Props, State> {
  swiper: Swiper;
  constructor (props) {
    super(props);
    const cardData = createArrayToFunctionProxy(this.props.studyManager, STACK_SIZE);
    this.state = {
      cardData,
      renderedCards: [],
      swipedAllCards: false,
    };
  }

  renderCard = (cardData, index) => {
    console.log(`cardData: ${cardData}`);
    return (
      <Card
        cardID={cardData.ID}
        foreignHeadwordAudio={cardData.foreignHeadwordAudio}
        front={cardData.front}
        back={cardData.back}
        exampleForeignLang={cardData.exampleForeignLang}
        exampleUserLang={cardData.exampleUserLang}
        ref={(card: Card) => this.state.renderedCards[index] = card}
      />
    );
  }

  score = (result) => {
    console.log(`on swiped ${result}`);
  }

  flipCard = (index) => {
    this.state.renderedCards[index].flip();
  }

  onSwipedAllCards = () => {
    console.log('swipedAll');
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderSwiper()}
      </View>
    );
  }

  renderSwiper = () => {
    if (this.state.cardData.length === 0) {
      return;
    }
    const badScore = () => this.score('bad');
    const okScore = () => this.score('ok');
    const greatScore = () => this.score('great');
    const flipTopCard = () => this.flipCard(this.swiper.state.firstCardIndex);
    return (
      <Swiper
          containerStyle={styles.swiper}
          ref={(swiper: Swiper) => { this.swiper = swiper; }}
          disableBottomSwipe
          onSwipedLeft={badScore}
          onSwipedRight={greatScore}
          onSwipedTop={okScore}
          onTapCard={this.flipCard}
          onSwipedAborted={flipTopCard}
          onSwipedAll={this.onSwipedAllCards}
          cards={this.state.cardData}
          renderCard={this.renderCard}
          stackSize={STACK_SIZE}
          stackSeparation={15}
          overlayLabels={overlayLabels}
          animateOverlayLabelsOpacity
          overlayOpacityHorizontalThreshold={width / 12}
          inputOverlayLabelsOpacityRangeX={[-width / 2, -width / 12, 0, width / 12, width / 2]}
          inputOverlayLabelsOpacityRangeY={[-height / 4, -height / 12, 0, height / 12, height / 4]}
          overlayOpacityVerticalThreshold={height / 12}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    backgroundColor: 'transparent',
  },
  swipeLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...cardLayout,
  },
  swipeLabelContainerBad: {
    backgroundColor: '#D13800',
  },
  swipeLabelContainerOK: {
    backgroundColor: '#EEE82C',
  },
  swipeLabelContainerGood: {
    backgroundColor: '#53A548',
  },
  swipeLabelIcon: {
    color: 'white',
    fontSize: 250,
  },
});

const overlayLabels = {
  left: {
    element: (
      <Icon
        style={styles.swipeLabelIcon}
        type='Foundation'
        name='x'
      />
    ),
    style: {
      wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerBad],
    },
  },
  top: {
    element: (
      <Icon
        style={styles.swipeLabelIcon}
        type='Entypo'
        name='check'
      />
    ),
    style: {
      wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerOK],
    },
  },
  right: {
    element: (
      <Icon
        style={styles.swipeLabelIcon}
        type='Entypo'
        // TODO: use a circle instead
        name='check'
      />
    ),
    style: {
      wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerGood],
    },
  },
};

export default Stage;
