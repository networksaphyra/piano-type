export function createCursor() {
  let word = 0;
  let position = 0;
  let currentElement = null;
  let currentLetter = null;

  function incrementWord() {
    word++;
    position = 0;
  }

  function incrementPosition() {
    position++;
  }

  function decrementPosition() {
    position = Math.max(0, position - 1);
  }

  function getPosition() {
    return position;
  }
  
  function getWord() {
    return word;
  }

  function getId() {
    return `word-${word}-position-${position}`;
  }

  return {
    incrementWord,
    incrementPosition,
    decrementPosition,
    getPosition,
    getWord,
    getId
  };
}