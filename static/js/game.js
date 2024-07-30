import { fetchText, generateText } from "./word-generator.js"
import { displayText } from "./display.js";


export async function runGame() {
  const words = await fetchText();
  const generateTextButton = $("#generateTextButton");
  const textContainer = $("#textContainer");

  let currentWords = [];

  generateTextButton.on("click", updateTextContainer);

  function updateTextContainer() {
    currentWords = generateText(words, 60); 
    displayText(currentWords, textContainer);
  }
}