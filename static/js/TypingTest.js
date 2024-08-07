import { Cursor } from "./Cursor.js";
import { Settings } from "./Settings.js";
import { generateText, fetchText } from "./WordGenerator.js";
import { KeyHandler } from "./KeyHandler.js";

export class TypingTest {
  constructor() {
    console.log("hereee");
    this.cursor = new Cursor();
    this.settings = new Settings();
    this.keyHandler = new KeyHandler(this);
    this.words = [];
    this.startTime = null;
    this.endTime = null;
    this.correctChars = 0;
    this.totalChars = 0;
    this.currentWordIndex = 0;
    this.timerId = null;
  }

  async initialize() {
    this.words = await fetchText();
    this.bindEvents();
  }

  bindEvents() {
    $(document).on("keydown", (event) => this.keyHandler.handleKeydown(event));
    console.log("binding");
  }

  generateNewTest() {
    const textContainer = $("#textContainer");
    textContainer.empty();
    textContainer.css("display", "block");
    const generatedText = generateText(this.words, this.settings.wordCount);
    generatedText.forEach((word) => textContainer.append(word));
    this.cursor.reset();
    this.cursor.updateCursorPosition();
    this.cursor.updateCursorHighlight();
    this.resetStats();
    if (this.timerId) clearTimeout(this.timerId);
  }

  startTest() {
    if (!this.startTime) {
      this.startTime = new Date();
      this.timerId = setTimeout(() => this.endTest(), this.settings.timeLimit * 1000);
    }
  }

  endTest() {
    if (!this.endTime) {
      this.endTime = new Date();
      clearTimeout(this.timerId);
      const results = this.calculateResults();
      this.displayResults(results);
      $("#textContainer").css("display", "none");
    }
  }

  resetStats() {
    this.startTime = null;
    this.endTime = null;
    this.correctChars = 0;
    this.totalChars = 0;
    this.currentWordIndex = 0;
  }

  updateStats(key) {
    if (!this.startTime) this.startTest();

    const currentWord = this.cursor.getWordElement().text();
    const currentPosition = this.cursor.getPosition();
    const currentChar = currentWord[currentPosition];

    if (currentChar) {
      this.totalChars++;
      if (key === currentChar) {
        this.correctChars++;
      }
    }
  }

  calculateResults() {
    const timeElapsed = (this.endTime - this.startTime) / 1000 / 60;
    const wpm = Math.round(this.totalChars / 5 / timeElapsed);
    const accuracy = Math.round((this.correctChars / this.totalChars) * 100);
    return { wpm, accuracy };
  }

  displayResults(results) {
    let resultText = `WPM: ${results.wpm}, Accuracy: ${results.accuracy}%`;
    console.log(resultText);
    alert(resultText);
  }
}