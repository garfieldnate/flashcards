// The main animated learning area of the app

import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { observer } from 'mobx-react';
import { Dimensions, Button, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import Card from './Card.tsx';
import cardLayout from './CardLayout.js';
import createArrayToFunctionProxy from '../utils/CreateArrayToFunctionProxy.js'

const { height, width } = Dimensions.get('window')
const STACK_SIZE = 3;

@observer
class Stage extends Component {
  constructor (props) {
    super(props);
    const cardData = createArrayToFunctionProxy(this.props.studyManager, STACK_SIZE);
    this.state = {
      cardData: cardData,
      renderedCards: [],
      swipedAllCards: false,
      swipeDirection: '',
    }
  }

  renderCard = (cardData, index) => {
    console.log("cardData: " + cardData);
    return (
      <Card
        cardID={cardData.ID}
        foreignHeadwordAudio={cardData.foreignHeadwordAudio}
        front={cardData.front}
        back={cardData.back}
        exampleForeignLang={cardData.exampleForeignLang}
        exampleUserLang={cardData.exampleUserLang}
        ref={(card) => this.state.renderedCards[index] = card}/>);
  };

  score = (result) => {
    console.log(`on swiped ${result}`);
  }

  flipCard = (index) => {
    this.state.renderedCards[index].flip();
  }

  onSwipedAllCards = () => {
    console.log("swipedAll");
  };

  render () {
    return (
      <View style={styles.container}>
        {this.renderSwiper()}
      </View>
    )
  }

  renderSwiper = () => {
    if (this.state.cardData.length === 0) {
      return
    }
    return (
      <Swiper
          containerStyle={styles.swiper}
          ref={swiper => {
            this.swiper = swiper
          }}
          disableBottomSwipe
          onSwipedLeft={() => this.score('bad')}
          onSwipedRight={() => this.score('great')}
          onSwipedTop={() => this.score('ok')}
          onTapCard={this.flipCard}
          onSwipedAborted={() => this.flipCard(this.swiper.state.firstCardIndex)}
          onSwipedAll={this.onSwipedAllCards}
          cards={this.state.cardData}
          renderCard={this.renderCard}
          stackSize={STACK_SIZE}
          stackSeparation={15}
          overlayLabels={{
            left: {
              element: <Icon style={styles.swipeLabelIcon}
                type="Foundation"
                name="x" />,
              style: {
                wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerBad]
              }
            },
            top: {
              element: <Icon style={styles.swipeLabelIcon}
                type="Entypo"
                name="check" />,
              style: {
                wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerOK]
              }
            },
            right: {
              element: <Icon style={styles.swipeLabelIcon}
                type="Entypo"
                name="check" />,
              style: {
                wrapper: [styles.swipeLabelContainer, styles.swipeLabelContainerGood]
              }
            },
          }}

          animateOverlayLabelsOpacity
          overlayOpacityHorizontalThreshold={width / 12}
          inputOverlayLabelsOpacityRangeX={[-width / 2, -width / 12, 0, width / 12, width / 2]}
          inputOverlayLabelsOpacityRangeY={[-height / 4, -height / 12, 0, height / 12, height / 4]}
          overlayOpacityVerticalThreshold={height / 12}
        >
      </Swiper>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    backgroundColor: 'transparent'
  },
  swipeLabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...cardLayout
  },
  swipeLabelContainerBad: {
    backgroundColor: '#D13800'
  },
  swipeLabelContainerOK: {
    backgroundColor: '#EEE82C'
  },
  swipeLabelContainerGood: {
    backgroundColor: '#53A548'
  },
  swipeLabelIcon: {
    color: 'white',
    fontSize: 250
  },
})

export default Stage;
