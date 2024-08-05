
export class StoryCard extends HTMLElement {
  constructor() {
    super();
  }

  render(wordList, wordIdx, putAtCenter, putAtBottom = false, isNewSentence = true, hue = 100, saturation = 100, lightness = 100) {
    const annotatedWords = wordList.map((word, idx) => idx === wordIdx ? `<span style='color:red'>${word}</span>` : word);
    this.innerHTML = genHtml(annotatedWords.join(' '), putAtCenter, putAtBottom, isNewSentence, hue, saturation, lightness);
  }

  async hideContentSlowly() {
    const div = this.querySelector('#story-card-content');
    return new Promise(resolve => {
      div.classList.toggle('hide');
      window.setTimeout(_ => {
        resolve();
      }, 100);
    });
  }
}

const fadeInCss = `
@keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
}
#story-card-content {
  animation: fadein 0.1s;
}
`;

const genHtml = (sentenceHtml, putAtCenter, putAtBottom, isNewSentence=true, hue = 100, saturation = 100, lightness = 100) => `
<style>
#story-card {
  display: flex;
  align-items: ${putAtCenter ? "center" : (putAtBottom ? "flex-end" : "flex-start")};
  ${putAtCenter ? "justify-content: center;" : ""}
  background: hsl(${hue}, ${saturation}%, ${lightness}%);
  width: 700px;
  height: 500px;
  font-size: 84px;
  border: solid 2px black;
}
${isNewSentence ? fadeInCss : ''}
.hide {
  opacity: 0;
  transition: all 0.1s;
}
</style>
<div id='story-card'>
 <div id='story-card-content'>${sentenceHtml}</div>
</div>
`;

customElements.define('story-card', StoryCard);
