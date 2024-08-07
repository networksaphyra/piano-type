import { createLetterTag } from "./WordGenerator.js";

export class KeyHandler {
  constructor(typingTest) {
    this.typingTest = typingTest;
    this.config = {
      classes: {
        temporary: "temporary",
        correct: "correct",
        incorrect: "incorrect",
        space: "space",
      },
      separators: {
        idSeparator: "-",
      },
    };
  }

  handleKeydown(event) {
    const { key, metaKey, ctrlKey, altKey } = event;
    const isModifierKey = metaKey || ctrlKey || altKey;
    const ignoredKeys = ['Shift', 'Control', 'Alt', 'CapsLock', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    
    if (isModifierKey) {
      if (key === "Backspace") {
        event.preventDefault();
        this.handleMetaBackspace();
        this.typingTest.cursor.updateCursorPosition();
        this.typingTest.cursor.updateCursorHighlight();
      }
      return;
    }

    if (ignoredKeys.includes(key) || isModifierKey) {
      return;
    }

    event.preventDefault();

    const keyHandlers = {
      Backspace: () => this.handleBackspace(),
      " ": () => this.handleSpacebar(key),
      default: () => this.handleCharacter(key),
    };

    (keyHandlers[key] || keyHandlers["default"])();
    console.log("spacebar");
    this.typingTest.cursor.updateCursorPosition();
    this.typingTest.cursor.updateCursorHighlight();
  }

  handleSpacebar(key) {
    const { cursor } = this.typingTest;
    if (cursor.getPosition() > 0) {
      const currentWord = cursor.getWordElement().text().trim();
      const typedWord = cursor
        .getWordElement()
        .find(
          `.${this.config.classes.correct}, .${this.config.classes.incorrect}`
        )
        .text();

      if (currentWord === typedWord) {
        this.typingTest.correctChars++; 
      }
      this.typingTest.totalChars++; 

      cursor.incrementWord();
      this.typingTest.currentWordIndex++;
    }
  }

  handleBackspace() {
    const { cursor } = this.typingTest;
    if (cursor.getPosition() > 0) {
      cursor.decrementPosition();
      const currentLetterElement = cursor.getLetterElement();
      if (currentLetterElement.hasClass(this.config.classes.temporary)) {
        this.removeTemporaryLetter(currentLetterElement);
      } else {
        currentLetterElement.removeClass(
          `${this.config.classes.correct} ${this.config.classes.incorrect}`
        );
        this.typingTest.totalChars--;
        if (currentLetterElement.hasClass(this.config.classes.correct)) {
          this.typingTest.correctChars--;
        }
      }
    }
  }

  handleMetaBackspace() {
    console.log("entered meta backspace...");
    const { cursor } = this.typingTest;
    const currentWordElement = cursor.getWordElement();

    currentWordElement.children(`.${this.config.classes.temporary}`).remove();
    currentWordElement.children(`.${this.config.classes.space}`).remove();
    currentWordElement
      .children()
      .removeClass(
        `${this.config.classes.correct} ${this.config.classes.incorrect}`
      );

    const id = `word-${cursor.getWord()}-position-${
      cursor.getWordElement().text().length
    }`;
    const spaceElement = createLetterTag(" ", id).addClass("space");

    currentWordElement.append(spaceElement);
    cursor.decrementWord();
    this.typingTest.currentWordIndex--;
  }

  handleCharacter(key) {
    const { cursor } = this.typingTest;
    const currentLetterElement = cursor.getLetterElement();
    if (currentLetterElement.hasClass(this.config.classes.space)) {
      if ($(".temporary").length > 10) return;
      this.insertTemporaryLetter(key, cursor);
    } else {
      this.markLetterStatus(
        currentLetterElement,
        key === currentLetterElement.text()
      );
    }
    cursor.incrementPosition();
    this.typingTest.updateStats(key);
  }

  insertTemporaryLetter(key, cursor) {
    const currentLetterElement = cursor.getLetterElement();
    const position = currentLetterElement.attr("id");
    const temporaryLetter = createLetterTag(key, position).addClass(
      this.config.classes.temporary
    );
    currentLetterElement.before(temporaryLetter);
    this.updateElementId(currentLetterElement, 1);
    this.markLetterStatus(temporaryLetter, false);
  }

  removeTemporaryLetter(temporaryLetterElement) {
    this.updateElementId(temporaryLetterElement.next(), -1);
    temporaryLetterElement.remove();
  }

  markLetterStatus(element, isCorrect) {
    element.addClass(
      isCorrect ? this.config.classes.correct : this.config.classes.incorrect
    );
  }

  updateElementId(element, delta) {
    const idParts = element
      .attr("id")
      .split(this.config.separators.idSeparator);
    const newPosition = parseInt(idParts.pop()) + delta;
    element.attr(
      "id",
      [...idParts, newPosition].join(this.config.separators.idSeparator)
    );
  }
}