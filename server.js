"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  handle404,
  clientList,
  targetClient,
  addClient,
  delClient,
} = require("./handlers/clientHandlers");
const {
  targetleWord,
  guessWord,
  guessLetter,
} = require("./handlers/hangmanHandlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .get("/clients/:id", targetClient)

  .get("/clients", clientList)

  .post("/clients", addClient)

  .delete("/clients", delClient)

  //HANGMAN END POINTS

  //   - `GET /hangman/guess/:id/:letter` This will return the appropriate status code.
  //   - If the letter guessed is in the word, return an array of booleans that map the
  // letter's position in the word. This will be processed by the FE.

  // For example, if the server receives this request `/hangman/guess/123/o`,
  // it should respond with a status `200` and an array `[false, false, false, true, false]`.
  // this means that the letter 'o' is located in the fourth position in the word.

  // ```
  // __ __ __ O __
  // ```

  // This mechanic should make it make it easier to build the frontend logic that will be required in the frontend.

  // - Once you have completed these steps, you should be able to _play_ the game via the Insomnia app to test your code.
  // - Grab pen and paper and test it out!

  // ---

  .get("/hangman/word/:id", targetleWord)

  .get("/hangman/word", guessWord)

  .get("/hangman/guess/:id/:letter", guessLetter)

  .get("/*", handle404)

  .listen(8000, () => console.log(`Listening on port 8000`));
