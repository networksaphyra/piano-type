export async function fetchText() {
  const response = await fetch("/api/words");
  return await response.json();
}

export function generateText(words, wordCount) {
  let wordList = [];
  for (let word = 0; word < wordCount; ++word) {

    let index = Math.floor(Math.random() * words.length);
    let currentWord = createWordTag(word.toString());

    for (let pos = 0; pos < words[index].length; ++pos) {
      const position = `word-${word}-position-${pos}`;
      const character = words[index][pos];

      const currentLetter = createLetterTag(character, position);
      currentWord.append(currentLetter);
    }
    wordList.push(currentWord);
  }

  function createWordTag(word) {
    return $("<span></span>").addClass("word").attr("id", word);
  }
  function createLetterTag(character, position) {
    return $("<span></span>").text(character).addClass("letter").attr("id", position);
  }

  return wordList;
}
