export class Settings { 
  constructor() {
    this.wordCount = 400;
    this.timeLimit = 10;
    this.theme = "Light";
  }

  setWordCount(wordCount) {
    this.wordCount = wordCount
  }

  setTimeLimit(timeLimit) {
    this.timeLimit = timeLimit;
  }

  setTheme(theme) {
    this.theme = theme;
  }
}