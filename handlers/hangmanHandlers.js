const { words } = require("../data/words");

function verifyWord(id) {
  return words.find((hangmanWord) => hangmanWord.id == id);
}

function targetleWord(req, res) {
  const wordId = req.params.id;
  const leWord = verifyWord(wordId);
  res.status(200).json({
    status: 200,
    leWord,
  });
}

function guessWord(req, res) {
  let wordInPlayID = Math.ceil(Math.random() * 6) * 1000;
  const wordInPlay = verifyWord(wordInPlayID);
  delete wordInPlay.word;
  res.status(200).json({ status: 200, wordInPlay });
  console.log(wordInPlay);
}

function guessLetter(req, res) {
  let wordGuessArray = [];
  const currentWordId = req.params.id;
  const guessedLetter = req.params.letter; //note to self, save yourself 3 hours and remember that /letter = your endpoint...

  console.log(currentWordId);
  console.log(guessedLetter);
  const gameWord = verifyWord(currentWordId).word;

  console.log(gameWord);

  for (i = 0; i < gameWord.length; i++) {
    if (gameWord[i] === guessedLetter) {
      wordGuessArray[i] = true;
    } else {
      wordGuessArray[i] = false;
    }
  }
  res.status(200).json(wordGuessArray);
}

module.exports = { targetleWord, guessWord, guessLetter };
