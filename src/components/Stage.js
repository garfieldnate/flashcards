// The main animated learning area of the app

import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper';
import { observer } from 'mobx-react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Card from './Card.js';

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
    return (<Card front={cardData.front} back={cardData.back} ref={(card) => this.state.renderedCards[index] = card}/>);
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
              title: '✖',
              style: {
                label: {
                  backgroundColor: 'red',
                  color: 'red',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            top: {
              title: 'OK',
              style: {
                label: {
                  backgroundColor: 'yellow',
                  color: '#FFA300',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            },
            right: {
              title: '✔',
              style: {
                label: {
                  backgroundColor: 'green',
                  color: '#000000',
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            }
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
    backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})

export default Stage;
