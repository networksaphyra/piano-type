import { fetchText, generateText } from "./word-generator.js"
import { displayText } from "./display.js";
import { createCursor } from "./cursor.js";

export async function runGame() {
  const words = await fetchText();
  const generateTextButton = $("#generateTextButton");
  const textContainer = $("#textContainer");

  let cursor;
  let currentWords = [];

  generateTextButton.on("click", updateTextContainer);

  function updateTextContainer() {
    currentWords = generateText(words, 80);
    cursor = createCursor();
    displayText(currentWords, textContainer);
    updateCursorPosition();
    textContainer.focus();
  }

  textContainer.on("keydown", event => handleKeydown(event));

  function handleKeydown(event) {
    event.preventDefault();
    const key = event.key;

    if (key === "Backspace") {
      handleBackspace();
    } else if (key.length === 1) {
      handleCharacter(key);
    }
    updateCursorPosition();
  }

  function handleBackspace() {
    cursor.decrementPosition();
    const currentLetterElement = $(`#${cursor.getId()}`);
    currentLetterElement.removeClass("correct incorrect");
  }

  function handleSpacebar() {
    cursor.incrementWord();
  }

  function handleCharacter(key) {
    const currentLetterElement = $(`#${cursor.getId()}`);
    const currentLetter = currentLetterElement.text();

    if (key === currentLetter) {
      if (key === " ") {
        handleSpacebar();
      } else {
        markCorrect(currentLetterElement);
        cursor.incrementPosition();
      }

    } else {
      markIncorrect(currentLetterElement);
      cursor.incrementPosition();
    }
  }

  function markCorrect(letter) {
    letter.addClass("correct");
  }

  function markIncorrect(letter) {
    letter.addClass("incorrect");
  }

  function updateCursorPosition() {
    $(".cursor").removeClass("cursor");
    $(`#${cursor.getId()}`).addClass("cursor");
  }

}