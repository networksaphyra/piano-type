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

  function getPosition() {
    return position;
  }

  function getWord() {
    return word;
  }

  function getWordElement() {
    return $(`#${word}`);
  }

  function getLetterElement() {
    return $(`#${getId()}`);
  }

  function getId() {
    return `word-${word}-position-${position}`;
  }


  function updateCursorPosition() {
    $(".cursor").removeClass("cursor");
    $(`#${getId()}`).addClass("cursor");
  }

  function updateCursorHighlight() {
    $(".highlight").removeClass("highlight");
    $(`#${getWord()}`).addClass("highlight");
  }

  return {
    incrementWord,
    incrementPosition,
    decrementPosition,
    getPosition,
    getWord,
    getWordElement,
    getLetterElement,
    getId,
    updateCursorPosition,
    updateCursorHighlight
  };
}
