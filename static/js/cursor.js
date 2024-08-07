// Cursor.js
export class Cursor {
  constructor() {
    this.position = 0;
    this.word = 0;
    this.config = {
      cursorClass: "cursor",
      highlightClass: "highlight",
      idPrefix: "word-",
      idSeparator: "-position-",
    };
  }

  incrementWord() {
    this.word++;
    this.position = 0;
  }

  incrementPosition() {
    this.position++;
  }

  decrementWord() {
    this.position = 0;
  }

  decrementPosition() {
    this.position = Math.max(0, this.position - 1);
  }

  getPosition() {
    return this.position;
  }

  getWord() {
    return this.word;
  }

  getLetterElement() {
    return $(`#${this.getId()}`);
  }

  getWordElement() {
    return $(`#word-${this.word}`);
  }

  getId() {
    return `${this.config.idPrefix}${this.word}${this.config.idSeparator}${this.position}`;
  }

  updateCursorPosition() {
    $(`.${this.config.cursorClass}`).removeClass(this.config.cursorClass);
    this.getLetterElement().addClass(this.config.cursorClass);
  }

  updateCursorHighlight() {
    $(`.${this.config.highlightClass}`).removeClass(this.config.highlightClass);
    this.getWordElement().addClass(this.config.highlightClass);
  }

  reset() {
    this.word = 0;
    this.position = 0;
  }
}