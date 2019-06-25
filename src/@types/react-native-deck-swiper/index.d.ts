declare module 'react-native-deck-swiper' {
  import { Component } from 'react';
  interface IProps {
    animateCardOpacity?: boolean;
    animateOverlayLabelsOpacity?: boolean;
    backgroundColor?: string;
    cardHorizontalMargin?: number;
    cardIndex?: number;
    cardStyle?: number | React.CSSProperties;
    cardVerticalMargin?: number;
    cards: array | object;
    containerStyle?: object;
    children?: any;
    childrenOnTop?: boolean;
    dragEnd?: func;
    dragStart?: func;
    disableBottomSwipe?: boolean;
    disableLeftSwipe?: boolean;
    disableRightSwipe?: boolean;
    disableTopSwipe?: boolean;
    goBackToPreviousCardOnSwipeBottom?: boolean;
    goBackToPreviousCardOnSwipeLeft?: boolean;
    goBackToPreviousCardOnSwipeRight?: boolean;
    goBackToPreviousCardOnSwipeTop?: boolean;
    horizontalSwipe?: boolean;
    horizontalThreshold?: number;
    infinite?: boolean;
    inputCardOpacityRangeX?: array;
    inputCardOpacityRangeY?: array;
    inputOverlayLabelsOpacityRangeX?: array;
    inputOverlayLabelsOpacityRangeY?: array;
    inputCardOpacityRange?: array;
    inputRotationRange?: array;
    keyExtractor?: func;
    marginBottom?: number;
    marginTop?: number;
    onSwiped?: func;
    onSwipedAborted?: func;
    onSwipedAll?: func;
    onSwipedBottom?: func;
    onSwipedLeft?: func;
    onSwipedRight?: func;
    onSwipedTop?: func;
    onSwiping?: func;
    onTapCard?: func;
    onTapCardDeadZone?: number;
    outputCardOpacityRangeX?: array;
    outputCardOpacityRangeY?: array;
    outputOverlayLabelsOpacityRangeX?: array;
    outputOverlayLabelsOpacityRangeY?: array;
    outputRotationRange?: array;
    outputCardOpacityRange?: array;
    overlayLabels?: object;
    overlayLabelStyle?: object;
    overlayLabelWrapperStyle?: object;
    overlayOpacityHorizontalThreshold?: number;
    overlayOpacityVerticalThreshold?: number;
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
    previousCardDefaultPositionX?: number;
    previousCardDefaultPositionY?: number;
    renderCard: func;
    secondCardZoom?: number;
    showSecondCard?: boolean;
    stackAnimationFriction?: number;
    stackAnimationTension?: number;
    stackScale?: number;
    stackSeparation?: number;
    stackSize?: number;
    swipeAnimationDuration?: number;
    swipeBackCard?: boolean;
    topCardResetAnimationFriction?: number;
    topCardResetAnimationTension?: number;
    useViewOverflow?: boolean;
    verticalSwipe?: boolean;
    verticalThreshold?: number;
    zoomAnimationDuration?: number;
    zoomFriction?: number;
  }
  interface IState {
    firstCardIndex: number;
  }
  export default class SwiperComponent extends React.Component<IProps, IState> {
    swipeTop: () => void;
    swipeBottom: () => void;
    swipeLeft: () => void;
    swipeRight: () => void;
  }
}
