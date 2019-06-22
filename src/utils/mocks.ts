import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;
const mockNavigator = (): Navigation => {
  const mockNavigator: any = {
    navigate: jest.fn(),
    state: {
      params: {
        userData: 'foo',
        deckSource: 'bar',
      },
    },
  };
  return mockNavigator;
};

export { mockNavigator };
