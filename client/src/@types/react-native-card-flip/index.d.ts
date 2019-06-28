declare module 'react-native-card-flip' {
  // Copie from repo; once the library is released again we will be able to delete this
  import { Component } from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  type FlipDirection = 'y' | 'x';

  type Direction = 'right' | 'left';

  type FlipCardProps = {
    style?: StyleProp<ViewStyle>;
    duration?: number;
    flipZoom?: number;
    flipDirection?: FlipDirection;
    onFlip?: (index: number) => void;
    onFlipEnd?: (index: number) => void;
    onFlipStart?: (index: number) => void;
    perspective?: number;
  };

  type FlipCardState = {
    duration: number;
    side: number;
    sides: JSX.Element[];
    progress: Animated.Value;
    rotation: Animated.ValueXY;
    zoom: Animated.Value;
    rotateOrientation: string;
    flipDirection: string;
  };

  declare class FlipCard extends Component<FlipCardProps, FlipCardState> {
    flip: () => void;

    tip: ({
      direction,
      duration,
      progress,
    }: {
      direction?: Direction;
      duration?: number;
      progress?: number;
    }) => void;

    jiggle: ({
      count,
      duration,
      progress,
    }: {
      count?: number;
      duration?: number;
      progress?: number;
    }) => void;
  }

  export default FlipCard;
}
