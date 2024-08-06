export function createWordTag(word) {
  return $("<span></span>").addClass("word").attr("id", `word-${word}`);
}

export function createLetterTag(character, position) {
  return $("<span></span>").text(character).addClass("letter").attr("id", position);
}

export function generateText(words, wordCount) {
  let wordList = [];
  for (let word = 0; word < wordCount; ++word) {
    let index = Math.floor(Math.random() * words.length);
    let currentWord = createWordTag(word);
    for (let pos = 0; pos < words[index].length; ++pos) {
      let position = `word-${word}-position-${pos}`;
      let character = words[index][pos];
      const currentLetter = createLetterTag(character, position);
      currentWord.append(currentLetter);
      if (pos === words[index].length - 1 && word != wordCount - 1) {
        position = `word-${word}-position-${pos + 1}`;
        character = " ";
        const spaceLetter = createLetterTag(character, position).addClass("space");
        currentWord.append(spaceLetter);
      }
    }
    wordList.push(currentWord);
  }
  return wordList;
}

export async function fetchText() {
  const response = await fetch("/api/words");
  return response.json();
}