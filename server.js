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

  .get("/clients/:id", targetClient)

  .get("/clients", clientList)

  .post("/clients", addClient)

  .get("/*", handle404)

  .delete("/clients", delClient)

  .listen(8000, () => console.log(`Listening on port 8000`));

//   ## Exercise 2

// There is a `clients.js` file inside of the data folder.

// Create RESTful endpoints in `server.js` that allow a user to access the data. Don't forget to respond with the appropriate HTTP code, including any errors that might occur.

// - An endpoint to access a list of all the clients.
// - An endpoint to access one client based on its `id`.
// - An endpoint to add a new client.
// - a detailed validation of the data is not really required, but you can verify that the email is new.
// - An endpoint to delete a customer based on its `id`.

// Use Insomnia to test out these endpoints.
