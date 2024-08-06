import { TypingTest } from './TypingTest.js';

$(document).ready(main);

function main() {
  console.log("here");
  
  const typingTest = new TypingTest();
  typingTest.initialize();
}
