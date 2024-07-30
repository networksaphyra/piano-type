export function displayText(currentWords, textContainer) {
    textContainer.empty();

    currentWords.forEach((word, index) => {
      textContainer.append(word);
      if (index < currentWords.length - 1) textContainer.append(" ");
    });
  }