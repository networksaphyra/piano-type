$(document).ready(main);

async function main() {
  const generateButton = $("#generateText");
  const typingArea = $("#typingArea");
  let words = []

  async function fetchText() {
    const response = await fetch("/api/words");
    const text = await response.json();
    words = text;
  }

  function generateText(wordCount) {
    let wordList = [];
    for (let word = 0; word < wordCount; ++word) {
      let index = Math.floor(Math.random() * words.length);
      const wordString = `${word}`;
      let currentWord = createWordTag(wordString);

      for (let pos = 0; pos < words[index].length; ++pos) {
        const position = `word-${word}-position-${pos}`;
        const character = words[index][pos];

        const pElement = createLetterTag(character, position);
        currentWord.append(pElement);
      }
      wordList.push(currentWord);
    }
    return wordList;
  }

  function createWordTag(word) {
    return $("<span></span>").addClass("word").attr("id", word);
  }

  function createLetterTag(character, position) {
    return $("<span></span>").text(character).addClass("letter").attr("id", position);
  }

  await fetchText();

  generateButton.on("click", displayText);

  function displayText() {
    console.log("BRO I ENTERED THE METHOD ON GOD");
    let generatedText = generateText(60);
    console.log(generatedText);
    const textContainer = $("#textContainer");
    textContainer.empty();

    generatedText.forEach((word, index) => {
      textContainer.append(word);
      if (index < generatedText.length - 1) textContainer.append(" ");
    });
  }

  function autoScroll() {
    const typingArea = document.getElementById('typingArea');
    typingArea.scrollTop = typingArea.scrollHeight;
  }
}