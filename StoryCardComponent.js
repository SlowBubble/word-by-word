
export class StoryCard extends HTMLElement {
  constructor() {
    super();
  }

  render(wordList, wordIdx, putAtBottom = false, hue = 0) {
    const annotatedWords = wordList.map((word, idx) => idx === wordIdx ? `<span style='color:red'>${word}</span>` : word);
    this.innerHTML = genHtml(annotatedWords.join(' '), putAtBottom, hue);
  }
}

const genHtml = (sentenceHtml, putAtBottom, hue) => `
<style>
#story-card {
  display: flex;
  ${putAtBottom ? "align-items: flex-end;" : ""}
  background: hsl(${hue}, 75%, 95%);
  width: 700px;
  height: 500px;
  font-size: 84px;
  border: solid 2px black;
}
</style>
<div id='story-card'>
 <div>${sentenceHtml}</div>
</div>
`;

customElements.define('story-card', StoryCard);
