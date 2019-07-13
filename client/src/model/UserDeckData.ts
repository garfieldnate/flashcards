import { ICard } from './Card';

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
        cardsDue: ICard[];
        nextDue: number;
      };
      getCardsDue: () => number;
    };
    lastStudied: string;
    numAddedToday: number;
  };
};
