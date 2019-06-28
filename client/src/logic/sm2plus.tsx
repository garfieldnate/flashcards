import DateTime from './DateTime';

// Determines which words should be studied in the current session using
// the SM2+ algorithm described here:
// http://www.blueraja.com/blog/477/a-better-spaced-repetition-learning-algorithm-sm2

const correctThreshold = 0.5;

const DAY_TO_SECONDS = 24 * 60 * 60;

// TODO: this entire class is basically pseudo-code
export default class SM2Plus {
  // dateProvider: DateTime;
  // model: any;
  // constructor(dateProvider, model) {
  //   this.dateProvider = dateProvider;
  //   this.model = model;
  // }
  // const getDefaultVariables = (dateNow) =>
  //   // TODO: use user preferences
  //   ({"difficulty": 0.3, "dateLastReviewed": dateNow, 'daysBetweenReviews': .25});
  // const getVarsForCard = (cardData, dateNow) => {
  //   var sm2pVars = this.model.getSM2PVars(cardData);
  //   return sm2pVars || this.getDefaultVariables(dateNow);
  // }
  // const updateSm2p = (cardData, performanceRating) => {
  //   const dateNow = this.dateProvider.now();
  //   const sm2pVars = this.getVarsForCard(cardData, dateNow);
  //   const correct = performanceRating >= correctThreshold;
  //   const percentOverdue = correct ?
  //     min(2, this.getPercentOverdue(dateNow, sm2pVars)) :
  //     1;
  //   // TODO: ensure this gets written to the model
  //   sm2pVars.difficulty += percentOverdue * 1 / 17 * (8 - 9 * performanceRating)
  //   difficultyWeight = this.getDifficultyWeight(sm2pVars['difficulty'])
  //   sm2pVars.daysBetweenReviews *= correct ?
  //     1 + (difficultyWeight - 1) * percentOverdue :
  //     1 / difficultyWeight ** 2;
  //   sm2pVars.dateLastReviewed = dateNow;
  //   this.model.updateSM2PlusVars(cardData, sm2pVars);
  // }
  // const getPercentOverdue = (dateNow, sm2pVars) => {
  //   const delta = dateNow - this.dateProvider.fromUnix(sm2pVars.dateLastReviewed);
  //   const deltaDays = float(delta.totalSeconds()) / DAY_TO_SECONDS;
  //   return deltaDays / sm2pVars.daysBetweenReviews;
  // }
  // const getDifficultyWeight = (difficulty) => (3 - 1.7 * difficulty;)
  // /**
  //   Given the list of all entries available for study, return a list of the ones that should
  //   be studied, in the order that they should be studied.
  // */
  // const prioritizeStudy = (cardList) => {
  //   dateNow = this.dateProvider.now()
  //   prioritizedCardList = []
  //   cardList.forEach((cardData) => {
  //     sm2pVars = this.model.getVarsForCard(cardData)
  //     cardData.percentOverdue = this.getPercentOverdue(dateNow, sm2pVars)
  //     if (cardData.percentOverdue >= 1) {
  //         prioritizedCardList.append(cardData)
  //     }
  //   });
  //   prioritizedCardList.sort(key=lambda t: t['percentOverdue'], reverse=True)
  //   return prioritizedCardList
  // }
}
