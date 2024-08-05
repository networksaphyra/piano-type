import { createLetterTag } from "./wordGenerator.js";

export function handleKeydown(event, cursor) {
  const key = event.key;

  if (event.metaKey || event.altKey) {
    return;
  }

  event.preventDefault();

  if (key === "Backspace") {
    handleBackspace(cursor);
  } else if (key === " ") {
    handleSpacebar(cursor);
  } else if (key.length === 1) {
    handleCharacter(key, cursor);
  }

  cursor.updateCursorPosition();
}

function handleSpacebar(cursor) {
  if (cursor.getPosition() === 0) return;
  cursor.incrementWord();
  cursor.updateCursorHighlight();
}

function handleBackspace(cursor) {
  cursor.decrementPosition();
  let currentLetterElement = cursor.getLetterElement();

  if (currentLetterElement.hasClass("temporary")) {
    let nextLetterElement = currentLetterElement.next();
    currentLetterElement.remove();
    decrementId(nextLetterElement);
  } else {
    currentLetterElement.removeClass("correct incorrect");
  }
}

function handleCharacter(key, cursor) {
  let currentLetterElement = cursor.getLetterElement();

  if (currentLetterElement.hasClass("space")) {
    let temporaryLetter = createTemporaryLetter(key, cursor);
    let spaceElement = cursor.getWordElement().children('.space');
    spaceElement.before(temporaryLetter);
    markIncorrect(temporaryLetter);
    
  } else {
    if (key === currentLetterElement.text()) {
      markCorrect(currentLetterElement);
    } else {
      markIncorrect(currentLetterElement);
    }
  }
  cursor.incrementPosition();
}

function createTemporaryLetter(key, cursor) {
  let currentLetterElement = cursor.getLetterElement();
  let position = currentLetterElement.attr("id");

  incrementId(currentLetterElement);
  let temporaryLetter = createLetterTag(key, position).addClass("temporary");

  return temporaryLetter;
}

function markCorrect(currentLetterElement) {
  currentLetterElement.addClass("correct");
}

function markIncorrect(currentLetterElement) {
  currentLetterElement.addClass("incorrect");
}

function incrementId(currentLetterElement) {
  let separated = currentLetterElement.attr("id").split("-");
  let positionPart = parseInt(separated[separated.length - 1]);
  positionPart++;
  separated[separated.length - 1] = positionPart;
  currentLetterElement.attr("id", separated.join("-"));
}

function decrementId(currentLetterElement) {
  let separated = currentLetterElement.attr("id").split("-");
  let positionPart = parseInt(separated[separated.length - 1]);
  positionPart--;
  separated[separated.length - 1] = positionPart;
  currentLetterElement.attr("id", separated.join("-"));
}
