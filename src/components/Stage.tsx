// The main animated learning area of the app

import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import StudyManager from '../logic/StudyManager';
import { Card as CardData } from '../model/Card';
import createArrayToFunctionProxy from '../utils/CreateArrayToFunctionProxy';

import Card from './Card';
import cardLayout from './CardLayout';

const { height, width } = Dimensions.get('window');
const STACK_SIZE = 3;

interface IProps {
  studyManager: StudyManager;
}

interface IState {
  cardData: CardData[];
  renderedCards: Card[];
  swipedAllCards: boolean;
}

@observer
class Stage extends Component<IProps, IState> {
  public swiper: Swiper;
  constructor(props: Readonly<IProps>) {
    super(props);
    const cardData = createArrayToFunctionProxy(
      this.props.studyManager,
      STACK_SIZE
    );
    this.state = {
      cardData,
      renderedCards: [],
      swipedAllCards: false,
    };
  }

  public renderCard = (cardData: CardData, index: number) => {
    return (
      <Card
        cardID={cardData.ID}
        foreignHeadwordAudio={cardData.foreignHeadwordAudio}
        front={cardData.front}
        back={cardData.back}
        exampleForeignLang={cardData.exampleForeignLang}
        exampleUserLang={cardData.exampleUserLang}
        ref={(card: Card) => (this.state.renderedCards[index] = card)}
      />
    );
  };

  public score = (result: string) => {
    console.log(`on swiped ${result}`);
  };

  public flipCard = (index: number) => {
    this.state.renderedCards[index].flip();
  };

  public onSwipedAllCards = () => {
    console.log('swipedAll');
  };

  public render() {
    return <View style={styles.container}>{this.renderSwiper()}</View>;
  }

  public renderSwiper = () => {
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
        ref={(swiper: Swiper) => {
          this.swiper = swiper;
        }}
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
        inputOverlayLabelsOpacityRangeX={[
          -width / 2,
          -width / 12,
          0,
          width / 12,
          width / 2,
        ]}
        inputOverlayLabelsOpacityRangeY={[
          -height / 4,
          -height / 12,
          0,
          height / 12,
          height / 4,
        ]}
        overlayOpacityVerticalThreshold={height / 12}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...cardLayout,
  },
  swipeLabelContainerBad: {
    backgroundColor: '#D13800',
  },
  swipeLabelContainerGood: {
    backgroundColor: '#53A548',
  },
  swipeLabelContainerOK: {
    backgroundColor: '#EEE82C',
  },
  swipeLabelIcon: {
    color: 'white',
    fontSize: 250,
  },
  swiper: {
    backgroundColor: 'transparent',
  },
});

const overlayLabels = {
  left: {
    element: <Icon style={styles.swipeLabelIcon} type='Foundation' name='x' />,
    style: {
      wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerBad],
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
  top: {
    element: <Icon style={styles.swipeLabelIcon} type='Entypo' name='check' />,
    style: {
      wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerOK],
    },
  },
};

export default Stage;
