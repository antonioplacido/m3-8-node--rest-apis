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
const { targetleWord, guessWord } = require("./handlers/hangmanHandlers");

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

  // endpoints

  //   ## Exercise 2

  // There is a `clients.js` file inside of the data folder.

  // Create RESTful endpoints in `server.js` that allow a user to access the data. Don't forget to respond with the appropriate HTTP code, including any errors that might occur.

  // - An endpoint to access a list of all the clients.
  // - An endpoint to access one client based on its `id`.
  // - An endpoint to add a new client.
  // - a detailed validation of the data is not really required, but you can verify that the email is new.
  // - An endpoint to delete a customer based on its `id`.

  // Use Insomnia to test out these endpoints.

  .get("/clients/:id", targetClient)

  .get("/clients", clientList)

  .post("/clients", addClient)

  .delete("/clients", delClient)

  //HANGMAN END POINTS

  //   - `GET /hangman/word` This will return an object that contains
  // - the `id` of a random word selected from an array of words - the `letterCount` of the word.
  // **It should NOT contain the actual word!**

  //   - `GET /hangman/guess/:id/:letter` This will return the appropriate status code.
  //   - If the letter guessed is in the word, return an array of booleans that map the
  // letter's position in the word. This will be processed by the FE.

  // For example, if the server receives this request `/hangman/guess/123/o`,
  // it should respond with a status `200` and an array `[false, false, false, true, false]`. this means that the letter 'o' is located in the fourth position in the word.

  // ```
  // __ __ __ O __
  // ```

  // This mechanic should make it make it easier to build the frontend logic that will be required in the frontend.

  // - Once you have completed these steps, you should be able to _play_ the game via the Insomnia app to test your code.
  // - Grab pen and paper and test it out!

  // ---

  .get("/hangman/word/:id", targetleWord)

  .get("/hangman/word", guessWord)

  .get("/*", handle404)

  .listen(8000, () => console.log(`Listening on port 8000`));
