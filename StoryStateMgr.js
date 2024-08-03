
export class StoryStateMgr {
  constructor(storyCard) {
    this.storyCard = storyCard;
    this.isBusyReading = false;
  }
  // Must call this for things to start working
  loadText(text) {
    if (this.isBusyReading) {
      return;
    }
    // Use \n as the delimiter for simplicity
    this.sentences = text.trim().split('\n').map(sentence => sentence.trim());
    this.sentenceIdx = 0;
    this.wordIdx = 0;
    this.wordListsList = this.sentences.map(sentence => sentence.split(' '));
    this.sentenceLengthsInWords = this.wordListsList.map(wordList => wordList.length);
    this.hue = Math.abs(hashCode(text)) % 360;
    this.renderStoryCard();
  }

  // moveToPreviousWord() {
  //   if (this.isBusyReading) {
  //     return false;
  //   }
  // }
  // Returns true if the end is reached.
  moveToNextWord() {
    if (this.isBusyReading) {
      return false;
    }
    const update = _ => {
      this.wordIdx += 1;
      if (this.wordIdx < this.sentenceLengthsInWords[this.sentenceIdx]) {
        return false;
      }
      this.wordIdx = 0;
      this.sentenceIdx += 1;
      if (this.sentenceIdx < this.sentences.length) {
        return false;
      }
      this.sentenceIdx = 0;
      return true;
    }
    const endIsReached = update();
    this.renderStoryCard();
    return endIsReached;
  }

  // Returns true if the end is reached.
  async readWordAndMoveToNextWord() {
    if (this.isBusyReading) {
      return false;
    }
    this.isBusyReading = true;
    await utter(this.wordListsList[this.sentenceIdx][this.wordIdx]);
    this.isBusyReading = false;
    // TODO compute before updating so that we can delay moving to the next page
    const endIsReached = this.moveToNextWord();
    if (endIsReached) {
      utter('The end!');
    }
    return endIsReached;
  }

  renderStoryCard() {
    this.storyCard.render(
      this.wordListsList[this.sentenceIdx], this.wordIdx,
      this.sentenceIdx % 2 === 1,
      this.hue);
      console.log(this.hue)
  }
}

async function utter(sentence, rate = 0.6) {
  return new Promise(resolve => {
    const speechSynthesisUtterance = new SpeechSynthesisUtterance(sentence);
    speechSynthesisUtterance.rate = rate;
    speechSynthesisUtterance.onend = function(evt) {
      resolve();
    }
    window.speechSynthesis.speak(speechSynthesisUtterance);
  });
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

