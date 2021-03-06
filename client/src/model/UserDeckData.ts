import { Card } from './Card';

export type UserDeckData = {
  prefs: {
    numNewCardsPerDay: number;
  };
  studyState: {
    cardData: {
      getCardsDueBetween: (
        start: number,
        end: number
      ) => {
        cardsDue: Card[];
        nextDue: number;
      };
      getCardsDue: () => number;
    };
    lastStudied: string;
    numAddedToday: number;
  };
};
