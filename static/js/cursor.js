export function createCursor() {
  let word = 0;
  let position = 0;
  
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

  function getWord() {
    return word;
  }

  function getPosition() {
    return position;
  }

  return {
    incrementWord,
    incrementPosition,
    decrementPosition,
    getWord,
    getPosition
  };
}