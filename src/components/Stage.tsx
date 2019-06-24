// The main animated learning area of the app

import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import StudyManager from '../logic/StudyManager';
import { Card as CardData } from '../model/Card';
import createArrayToFunctionProxy from '../utils/CreateArrayToFunctionProxy';
import ConfirmationModal from './ConfirmationModal';

import Card from './Card';
import cardLayout from './CardLayout';

const { height, width } = Dimensions.get('window');
const STACK_SIZE = 3;

interface IProps {
  studyManager: StudyManager;
}

interface IState {
  cardData: CardData[]; // is actually a CardData[], but we are using a Proxy for now, so we have to do this
  renderedCards: Card[];
  swipedAllCards: boolean;
  deleteModalVisible: boolean;
  confirmDeleteCard?: CardData;
}

@observer
class Stage extends Component<IProps, IState> {
  private swiper: Swiper;
  constructor(props: Readonly<IProps>) {
    super(props);
    const cardData = createArrayToFunctionProxy(
      this.props.studyManager,
      STACK_SIZE
    );
    this.state = {
      cardData,
      deleteModalVisible: false,
      renderedCards: [],
      swipedAllCards: false,
    };
  }

  public renderCard = (cardData: CardData, index: number) => {
    return (
      <Card
        cardData={cardData}
        firstTimeSeen={true}
        ref={(card: Card) => (this.state.renderedCards[index] = card)}
        onDelete={this.showDeleteModal}
      />
    );
  };

  public score = (result: string) => {
    console.log(`TODO: handle getting score of ${result}`);
  };

  public flipCard = (index: number) => {
    this.state.renderedCards[index].flip();
  };

  public onSwipedAllCards = () => {
    console.log('TODO: handle swiped all');
  };

  public render() {
    return (
      <View style={styles.container}>
        {this.renderSwiper()}
        {this.renderDeleteModal()}
      </View>
    );
  }

  private renderSwiper = () => {
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

  private showDeleteModal = (cardData: CardData) => {
    this.setState({
      confirmDeleteCard: cardData,
      deleteModalVisible: true,
    });
  };

  private hideDeleteModal = () => {
    this.setState({
      confirmDeleteCard: undefined,
      deleteModalVisible: false,
    });
  };

  private deleteCard = () => {
    this.swiper.swipeBottom();
    this.hideDeleteModal();
    console.log(`TODO: delete card ${this.state.confirmDeleteCard.front}`);
  };

  private renderDeleteModal = () => {
    const message = this.state.deleteModalVisible
      ? `Are you sure you want to delete this card?\n\n"${this.state.confirmDeleteCard.front}"`
      : '';
    return (
      <ConfirmationModal
        message={message}
        confirmMessage={'Delete'}
        rejectMessage={'Keep'}
        onConfirm={this.deleteCard}
        onReject={this.hideDeleteModal}
        isVisible={this.state.deleteModalVisible}
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
