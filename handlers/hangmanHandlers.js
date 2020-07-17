const { words } = require("../data/words");

function verifyWord(id) {
  return words.find((hangmanWord) => hangmanWord.id == id);
}

function targetleWord(req, res) {
  const wordId = req.params.id;
  const leWord = verifyWord(wordId);
  console.log(leWord);
  res.status(200).json({
    status: 200,
    leWord,
  });
}

function guessWord(req, res) {
  const wordsInPlayID = Math.ceil(Math.random() * 6) * 1000;
  const wordInPlay = verifyWord(wordsInPlayID);
  res.status(200).json({
    wordInPlay,
  });
}

module.exports = { targetleWord, guessWord };
