import { StoryCard } from './StoryCardComponent.js';
import { StoryStateMgr } from './StoryStateMgr.js'
import { getUrlParamsMap } from "./url.js";
import { sanitizeName } from "./sanitizeName.js";


const stories = [
`
Jacob loves|his scooter.
He rides the scooter|to the schoolyard.
He rides the scooter|around the schoolyard.
And he rides the scooter|home.
The end!
`,
`
isGirlStory=1
Mommy gives Emma|a puppet.
Emma calls the puppet|Mr. Lion.
Jacob hugs Mr. Lion.
Daddy puts Mr. Lion|into the toy box.
The end!
`,
`
Jacob climbs up|the ladder.
Emma climbs up|the helix.
Jacob goes down|the slide.
Emma follows Jacob|down the slide.
The end!
`
];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function main() {
  const paramsMap = getUrlParamsMap();
  const nameReplacements = [];
  let readPhrase = false;
  let readSentence = false;
  paramsMap.forEach((value, key) => {
    const possName = sanitizeName(value);
    if (!possName || !key) {
      return;
    }
    if (key === 'read_phrase') {
      readPhrase = true;
    }
    if (key === 'read_sentence') {
      readSentence = true;
    }
    nameReplacements.push({
      'old': key,
      'new': possName,
    });
    if (key[0].toLowerCase() === key[0] && possName[0].toLowerCase() === possName[0]) {
      nameReplacements.push({
      'old': capitalizeFirstLetter(key),
      'new': capitalizeFirstLetter(possName),
    });
    }
  });
  const storyCard = new StoryCard();
  document.body.appendChild(storyCard);
  const storyStateMgr = new StoryStateMgr(storyCard);
  storyStateMgr.loadStories(stories, readPhrase, readSentence, nameReplacements);

  setupKeyboardControl(storyStateMgr);
}

function setupKeyboardControl(storyStateMgr) {
  document.body.onkeyup = evt => {
    if (evt.key == " ") {
      storyStateMgr.readWordAndMoveToNextWord();
    }
  };
}

main();


