import { Component } from 'react';

declare module 'react-native-card-flip' {
  interface IProps {
    style: number | {} | array;
    duration: number;
    flipZoom: number;
    flipDirection: string;
    onFlip: () => void;
    onFlipEnd: () => void;
    onFlipStart: () => void;
    perspective: number;
  }
  interface IState {
    side: number;
  }
  type CardFlip = Component<IProps, IState>;
}
