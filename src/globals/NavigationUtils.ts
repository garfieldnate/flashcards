// from https://dev.to/andreasbergqvist/react-navigation-with-typescript-29ka
import { useContext } from 'react';
import {
  NavigationContext,
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp,
  NavigationScreenProps,
  NavigationStackScreenOptions,
  NavigationState,
} from 'react-navigation';

export function useNavigation<P = NavigationParams, S = {}>() {
  return useContext(NavigationContext) as NavigationScreenProp<
    NavigationRoute<P>,
    P
  >;
}

// For some reason, when wrapping a functional component in observer() the
// function must annotated with this in order for TypeScript to be okay with
// setting the navigationOptions field afterwards.
export interface INavStatelessComponent<P = NavigationParams, Options = any>
  extends React.StatelessComponent {
  navigationOptions?: ({
    navigation,
  }: NavigationScreenProps<P, Options>) => NavigationStackScreenOptions;
}
