import { createLetterTag } from "./wordGenerator.js";

export class KeyHandler {
  constructor(typingTest) {
    this.typingTest = typingTest;
    this.config = {
      classes: {
        temporary: "temporary",
        correct: "correct",
        incorrect: "incorrect",
        space: "space"
      },
      separators: {
        idSeparator: "-"
      }
    };
  }

  handleKeydown(event) {
    const { key, metaKey, ctrlKey, altKey } = event;
    const isModifierKey = metaKey || ctrlKey || altKey;

    if (isModifierKey) {
      if (key === "Backspace") {
        this.handleMetaBackspace();
        event.preventDefault();
        this.typingTest.cursor.updateCursorPosition();
        this.typingTest.cursor.updateCursorHighlight();
        this.typingTest.updateStats(key);
      }
      return;
    }

    event.preventDefault();

    const keyHandlers = {
      "Backspace": () => this.handleBackspace(),
      " ": () => this.handleSpacebar(),
      "default": () => this.handleCharacter(key)
    };

    (keyHandlers[key] || keyHandlers["default"])();
    this.typingTest.cursor.updateCursorPosition();
    this.typingTest.cursor.updateCursorHighlight();
    this.typingTest.updateStats(key);
  }

  handleSpacebar() {
    const { cursor } = this.typingTest;
    if (cursor.getPosition() > 0) {
      cursor.incrementWord();
      this.typingTest.currentWordIndex++;
    }
  }

  handleBackspace() {
    const { cursor } = this.typingTest;
    cursor.decrementPosition();
    const currentLetterElement = cursor.getLetterElement();
    if (currentLetterElement.hasClass(this.config.classes.temporary)) {
      this.removeTemporaryLetter(currentLetterElement);
    } else {
      currentLetterElement.removeClass(`${this.config.classes.correct} ${this.config.classes.incorrect}`);
    }
  }

  handleMetaBackspace() {
    console.log("entered meta backspace...");
    const { cursor } = this.typingTest;
    const currentWordElement = cursor.getWordElement();
    currentWordElement.children(`.${this.config.classes.temporary}`).remove();
    currentWordElement.children().removeClass(`${this.config.classes.correct} ${this.config.classes.incorrect}`);
    cursor.decrementWord();
    this.typingTest.currentWordIndex--;
  }

  handleCharacter(key) {
    const { cursor } = this.typingTest;
    const currentLetterElement = cursor.getLetterElement();
    if (currentLetterElement.hasClass(this.config.classes.space)) {
      this.insertTemporaryLetter(key, cursor);
    } else {
      this.markLetterStatus(currentLetterElement, key === currentLetterElement.text());
    }
    cursor.incrementPosition();
  }

  insertTemporaryLetter(key, cursor) {
    const currentLetterElement = cursor.getLetterElement();
    const position = currentLetterElement.attr("id");
    const temporaryLetter = createLetterTag(key, position).addClass(this.config.classes.temporary);
    currentLetterElement.before(temporaryLetter);
    this.updateElementId(currentLetterElement, 1);
    this.markLetterStatus(temporaryLetter, false);
  }

  createTemporaryLetter(key, cursor) {
    const currentLetterElement = cursor.getLetterElement();
    const position = currentLetterElement.attr("id");
    this.updateElementId(currentLetterElement, +1);
    return createLetterTag(key, position).addClass(this.config.classes.temporary);
  }

  removeTemporaryLetter(temporaryLetterElement) {
    this.updateElementId(temporaryLetterElement.next(), -1);
    temporaryLetterElement.remove();
  }

  markLetterStatus(element, isCorrect) {
    element.addClass(isCorrect ? this.config.classes.correct : this.config.classes.incorrect);
  }

  updateElementId(element, delta) {
    const idParts = element.attr("id").split(this.config.separators.idSeparator);
    const newPosition = parseInt(idParts.pop()) + delta;
    element.attr("id", [...idParts, newPosition].join(this.config.separators.idSeparator));
  }
}