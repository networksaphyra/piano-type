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
    for (let count = 1; count <= wordCount; ++count) {
      let index = Math.floor(Math.random() * words.length);
      wordList.push(words[index]);
    }
    return wordList.join(" ");
  }

  await fetchText();

  generateButton.on("click", displayText);

  function displayText() {
    console.log("BRO I ENTERED THE METHOD ON GOD");
    let generatedText = generateText(20);
    console.log(generatedText);
    typingArea.text(generatedText);
  }

}