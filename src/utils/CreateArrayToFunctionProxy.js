// the swiper library takes an array of cards and stores an internal pointer to
// the current card. Since we are generating cards as we go, this is really
// difficult to work with. To get around it, we create a proxy that pretends
// to be an array but underneath calls StudyManager.getNextCard().
const createArrayToFunctionProxy = (studyManager, stackSize) => {
  var generatedCards = [];
  var length;

  // look ahead stackSize cards so that we can properly report the array
  // length when it matters to the swiper component
  const addBufferCards = (index) => {
    const bufferNeeded = Math.max(0, index - generatedCards.length + stackSize);
    console.log("generatedCards.length: " + generatedCards.length)
    console.log("index: " + index)
    console.log("stackSize: " + stackSize)
    console.log("adding buffer: " + bufferNeeded)
    for (var i = 0; i < bufferNeeded; i++) {
      var newCard = studyManager.getNextCard();
      if (newCard) {
        generatedCards.push(newCard);
      } else {
        length = generatedCards.length;
        break;
      }
    }
  }
  addBufferCards(0);

  var handler = {
    get: function(target, name) {
      console.log("proxying: " + name);
      if (name === 'length') {
        console.log("returning length: " + length)
        return length;
      } else if(isNaN(name)) {
        return;
      }
      addBufferCards(name);

      if (name < generatedCards.length) {
        console.log("returning previous: " + generatedCards[name])
        return generatedCards[name];
      } else {
        var newCard = studyManager.getNextCard();
        if (newCard) {
          generatedCards.push(newCard);
          console.log("returning new: " + newCard)
          return newCard;
        }
      }
      length = generatedCards.length;
      console.log("set length to " + length)
      console.log("returning undefined")
      return;
    }
  };
  return new Proxy({}, handler);
}

export default createArrayToFunctionProxy;
