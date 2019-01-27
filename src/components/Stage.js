// The main animated learning area of the app

import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { observer } from 'mobx-react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

import Card from './Card.js';
import cardLayout from './CardLayout.js';

@observer
class Stage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cardData: this.props.studyManager.cards,
      renderedCards: [],
      swipedAllCards: false,
      swipeDirection: '',
    }
  }

  renderCard = (cardData, index) => {
    return (
      <Card
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
    console.log("rendering");
    return (
      <View style={styles.container}>
        <Swiper
          containerStyle={styles.swiper}
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwipedLeft={() => this.score('bad')}
          onSwipedRight={() => this.score('great')}
          onSwipedTop={() => this.score('ok')}
          onTapCard={this.flipCard}
          onSwipedAborted={() => this.flipCard(this.swiper.state.firstCardIndex)}
          cards={this.state.cardData.toJS()}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
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
          animateCardOpacity
          disableBottomSwipe
        >
        </Swiper>
      </View>
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
