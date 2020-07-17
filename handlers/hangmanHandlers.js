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
  const wordInPlayID = Math.ceil(Math.random() * 6) * 1000;
  const wordInPlay = verifyWord(wordInPlayID);
  delete wordInPlay.word;
  res.status(200).json({ status: 200, wordInPlay });
  console.log(wordInPlay);
}

module.exports = { targetleWord, guessWord };
