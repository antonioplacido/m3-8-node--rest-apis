const { words } = require("../data/words");

function verifyWord(id) {
  return words.find((hangmanWord) => hangmanWord.id == id);
}

function targetleWord(req, res) {
  const wordId = req.params.id;
  const leWord = verifyWord(wordId);
  console.log(leWord);
}

function wordsList(req, res) {
  res.status(200).json({ words: words });
}

module.exports = { targetleWord, wordsList };
