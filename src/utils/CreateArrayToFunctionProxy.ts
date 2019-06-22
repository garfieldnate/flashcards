import StudyManager from '../logic/StudyManager';
import { Card } from '../model/Card';

// the swiper library takes an array of cards and stores an internal pointer to
// the current card. Since we are generating cards as we go, this is really
// difficult to work with. To get around it, we create a proxy that pretends
// to be an array but underneath calls StudyManager.getNextCard().
const createArrayToFunctionProxy = (
  studyManager: StudyManager,
  stackSize: number
): Card[] => {
  const generatedItems = [];
  let length: number;

  // look ahead stackSize items so that we can properly report the array
  // length when it matters to the swiper component
  const addBufferItems = (index: number) => {
    const bufferNeeded = Math.max(0, index - generatedItems.length + stackSize);
    // console.log("generatedItems.length: " + generatedItems.length)
    // console.log("index: " + index)
    // console.log("stackSize: " + stackSize)
    // console.log("adding buffer: " + bufferNeeded)
    for (let i = 0; i < bufferNeeded; i += 1) {
      const newCard = studyManager.getNextCard();
      if (newCard) {
        generatedItems.push(newCard);
      } else {
        length = generatedItems.length;
        break;
      }
    }
  };
  addBufferItems(0);

  const handler = {
    get(target: any, name: 'length' | number) {
      // console.log("proxying: " + name);
      if (name === 'length') {
        // console.log("returning length: " + length)
        return length;
      }
      if (isNaN(name)) {
        return;
      }
      addBufferItems(name);

      if (name < generatedItems.length) {
        // console.log("returning previous: " + generatedItems[name])
        return generatedItems[name];
      }
      const newCard = studyManager.getNextCard();
      if (newCard) {
        generatedItems.push(newCard);
        // console.log("returning new: " + newCard)
        return newCard;
      }

      length = generatedItems.length;
      // console.log("set length to " + length)
      // console.log("returning undefined")
      return;
    },
  };
  return new Proxy<[]>([], handler);
};

export default createArrayToFunctionProxy;
