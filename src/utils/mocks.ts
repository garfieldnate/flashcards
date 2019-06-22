import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;
const mockNavigator = (): Navigation => {
  const mockedNavigator: any = {
    navigate: jest.fn(),
    state: {
      params: {
        deckSource: 'bar',
        userData: 'foo',
      },
    },
  };
  return mockedNavigator;
};

export { mockNavigator };
