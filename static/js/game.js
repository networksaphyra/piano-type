import { fetchText, generateText } from "./wordGenerator.js";
import { displayText } from "./display.js";
import { createCursor } from "./cursor.js";
import { handleKeydown } from "./handleKeydown.js";

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
    cursor.updateCursorPosition();
    cursor.updateCursorHighlight();
    textContainer.focus();
  }

  textContainer.on("keydown", event => handleKeydown(event, cursor));

}