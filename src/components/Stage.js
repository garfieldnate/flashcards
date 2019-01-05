// The main animated learning area of the app

import {Enum} from 'enumify';
import React, { Component } from "react";
import { Alert, Dimensions, StyleSheet, View, Text, PanResponder, Animated } from "react-native";

import Card from './Card.js';

const { width, height } = Dimensions.get("window");

class SelectedPerformance extends Enum {};
SelectedPerformance.initEnum(['GOOD', 'OK', 'BAD', 'NONE']);

export default class Stage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      pan: new Animated.ValueXY(),
      zones: {good: {}, ok: {}, bad: {}}
    };
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };
    const zoneSaver = key => e => {
      const { width, height, x, y } = e.nativeEvent.layout;
      this.state.zones[key] = {
        top: y,
        bottom: y + height,
        left: x,
        right: x + width
      };
      console.log(`${key}: `);
      console.log(this.state.zones[key]);
    };
    return (
      <View style={styles.mainContainer}>
        <View style={styles.goodDropZone} onLayout={zoneSaver('good')} />
        <View style={styles.okDropZone} onLayout={zoneSaver('ok')} />
        <View style={styles.badDropZone} onLayout={zoneSaver('bad')} />
        <View style={styles.dragContainer}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, {top: 2*width/5}]}
          >
            <Card front="สวัสดี"
              back= "hello"
              ref={(card) => this.card = card} />
          </Animated.View>
        </View>
      </View>
    );
  }

  componentWillMount = this.animateCard;

  flip() {
    this.card.flip();
  }

  animateCard() {
    const initial_location = {x: 0, y:0};
    this._val = { x:initial_location.x, y:initial_location.y }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        // make card draggable
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          // The user has touched the card
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:initial_location.x, y:initial_location.y})
        },
        onPanResponderMove: (e, gesture) => {
          // the user has made a movement
          this.state.pan.setValue({x: gesture.dx, y: gesture.dy});
        },
        onPanResponderRelease: (e, gesture) => {
          // The user has let go of the card
          const judgement = this.getDropResult(gesture);
          // if the user scored the card, then fling it in the direction
          // that they selected
          if (judgement !== SelectedPerformance.NONE) {
            var destination;
            if(judgement === SelectedPerformance.OK) {
              destination = {x: 0, y: -height};
            } else if(judgement === SelectedPerformance.GOOD) {
              destination = {x: width * 2, y: 0};
            } else if(judgement === SelectedPerformance.BAD) {
              destination = {x: -2*width, y: 0};
            }
            Animated.timing(this.state.pan, {
              toValue: destination,
              duration: 200
            }).start(() =>
              {
                Alert.alert(`Chose ${judgement}!`);
              }
            );
          } else {
            // If the user did not score the card, move it back to the
            // center and flip it (good for shaky hands that have trouble
            // trouble tapping).
            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0 },
              friction: 50
            }).start();
            this.flip();
          }
        }
      });
  }

  getDropResult(gesture) {
    console.log(gesture);
    if (-gesture.dy >= this.state.zones.ok.bottom) {
        console.log(-gesture.dy);
      return SelectedPerformance.OK;
    } else if(gesture.dx < this.state.zones.bad.right) {
      return SelectedPerformance.BAD;
    } else if(gesture.dx > this.state.zones.good.left) {
      return SelectedPerformance.GOOD;
    }
    return SelectedPerformance.NONE;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    zIndex: -100
  },
  dragContainer: {
    alignItems: 'center'
  },
  goodDropZone: {
    position: "absolute",
    top: "20%",
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.2)",
    width: "20%",
  },
  okDropZone: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.2)",
    height: "20%",
  },
  badDropZone: {
    position: "absolute",
    top: "20%",
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.2)",
    width: "20%",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  }
});
