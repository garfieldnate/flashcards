// The main animated learning area of the app

import { observer } from 'mobx-react';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import StudyManager from '../logic/StudyManager';
import { CardId, ICard as CardData } from '../model/Card';
import ConfirmationModal from './ConfirmationModal';

import { IObservableValue } from 'mobx';
import { StudyResult } from '../logic/StudyResult';
import Card from './Card';
import cardLayout from './CardLayout';

const { height, width } = Dimensions.get('window');
const STACK_SIZE = 3;

interface IProps {
  studyManager: StudyManager;
}

interface IState {
  cardData: CardData[];
  hadRetrievalError: IObservableValue<boolean>;
  renderedCards: Card[];
  swipedAllCards: boolean;
  deleteModalVisible: boolean;
  confirmDeleteCard?: CardData;
}

@observer
class Stage extends Component<IProps, IState> {
  private swiperRef = React.createRef<Swiper>();
  constructor(props: Readonly<IProps>) {
    super(props);
    const {
      cardsDue: cardData,
      hadRetrievalError,
    } = this.props.studyManager.getCardsDue();
    this.state = {
      cardData,
      deleteModalVisible: false,
      hadRetrievalError,
      renderedCards: [],
      swipedAllCards: false,
    };
  }

  public renderCard = (cardData: CardData, index: number) => {
    // console.log(`Rendering card ${cardData.getId()}`);
    return (
      <Card
        cardData={cardData}
        firstTimeSeen={true}
        ref={(card: Card) => (this.state.renderedCards[index] = card)}
        onDelete={this.showDeleteModal}
      />
    );
  };

  public score = (cardId: CardId, result: StudyResult) => {
    this.props.studyManager.registerStudyResult(cardId, result);
  };

  public flipCard = (index: number) => {
    console.log('flipCard in stage');
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
    const getTopCardId = () =>
      this.state.renderedCards[
        this.swiperRef.current!.state.firstCardIndex
      ].props.cardData.getId();
    const badScore = () => this.score(getTopCardId(), StudyResult.Bad);
    const okScore = () => this.score(getTopCardId(), StudyResult.Ok);
    const greatScore = () => this.score(getTopCardId(), StudyResult.Good);
    const flipTopCard = () =>
      this.flipCard(this.swiperRef.current!.state.firstCardIndex);
    let retrievalErrorEl = null;
    if (this.state.hadRetrievalError) {
      retrievalErrorEl = (
        <Text>Some card data could not be retrieved from the server :(</Text>
      );
    }
    return (
      <Swiper
        containerStyle={styles.swiper}
        ref={this.swiperRef}
        disableBottomSwipe
        onSwipedLeft={badScore}
        onSwipedRight={greatScore}
        onSwipedTop={okScore}
        onTapCard={this.flipCard}
        onSwipedAborted={flipTopCard}
        onSwipedAll={this.onSwipedAllCards}
        cards={this.state.cardData.slice()}
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
      >
        {retrievalErrorEl}
      </Swiper>
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
    this.swiperRef.current!.swipeBottom();
    this.hideDeleteModal();
    console.log(
      `TODO: delete card ${this.state.confirmDeleteCard!.getHeadwordUserLang(
        'TODO'
      )}`
    );
  };

  private renderDeleteModal = () => {
    const message = this.state.confirmDeleteCard
      ? `Are you sure you want to delete this card?\n\n"${this.state.confirmDeleteCard!.getHeadwordForeignLang()}"`
      : 'Error! This message is about deleting a card, but no card was selected to be deleted.';
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
