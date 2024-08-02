export function displayText(currentWords, textContainer) {
    textContainer.empty();

    currentWords.forEach((word, index) => {
      textContainer.append(word);
    });
  }