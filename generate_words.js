const fileSystem = require("fs");
const wordList = require("wordlist-english");

const words = wordList["english/20"];
fileSystem.writeFileSync("./words.json", JSON.stringify(words));