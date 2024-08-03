import { StoryCard } from './StoryCardComponent.js';
import { StoryStateMgr } from './StoryStateMgr.js'


function main() {
  const storyCard = new StoryCard();
  document.body.appendChild(storyCard);
  const storyStateMgr = new StoryStateMgr(storyCard);
  const story1Text = `Jason loves his scooter.
He rides the scooter to the school yard.
He rides the scooter around the school yard.
And he rides the scooter home.`;
  storyStateMgr.loadText(story1Text);

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


