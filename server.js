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

  .get("/*", handle404)

  .delete("/clients", delClient)

  // ## Exercise 3 - Hangman!

  // Let's build a Hangman Game!

  // Obviously, this could all be done in the frontend, with vanilla JS, but where's the fun in that! Besides, we are not very trusting and keeping the
  // entire game in the FE would allow users to cheat, if they knew enough JavaScript to find the answer in the `script`s.

  // ### Guidelines

  // You will divide your concerns in two: the frontend, and the backend. Start with the backend. Only move on to the fronted once you have a fully functional API.

  // #### Backend

  // - There is a data file called `words.js` that should contain an array of words. Add more words to this file --at least 10. Each word should follow this format.

  // ```js
  // {
  //   id: '123',
  //   word: 'bacon',
  //   letterCount: '5'
  // }
  // ```

  // - Create an API that contains these endpoints.
  //   - A `/hangman/word/:id` endpoint can also accept an `id` in its url. If it's provided, it will return the word object, as it is in the array of words. _This is ONLY for testing purposes._ **Do not use this endpoint in the Frontend.**
  //   - `GET /hangman/word` This will return an object that contains - the `id` of a random word selected from an array of words - the `letterCount` of the word. **It should NOT contain the actual word!**
  //   - `GET /hangman/guess/:id/:letter` This will return the appropriate status code.
  //   - If the letter guessed is in the word, return an array of booleans that map the letter's position in the word. This will be processed by the FE.

  // For example, if the server receives this request `/hangman/guess/123/o`, it should respond with a status `200` and an array `[false, false, false, true, false]`. this means that the letter 'o' is located in the fourth position in the word.

  // ```
  // __ __ __ O __
  // ```

  // This mechanic should make it make it easier to build the frontend logic that will be required in the frontend.

  // - Once you have completed these steps, you should be able to _play_ the game via the Insomnia app to test your code.
  // - Grab pen and paper and test it out!

  // ---

  .listen(8000, () => console.log(`Listening on port 8000`));
