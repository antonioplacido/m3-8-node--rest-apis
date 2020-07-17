const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

// write your handlers here...

function validateEmail(email) {
  return clients.find((client) => client.email == email);
}

function searchClient(id) {
  return clients.find((client) => client.id == id);
}

function addClient(req, res) {
  const clientEmail = req.body.email;
  const client = validateEmail(clientEmail);
  const newClient = req.body;
  if (client) {
    res.status(400).json({
      message: "That email is already registered",
    });
  } else {
    clients.push(newClient);
    res.status(200).send("Add successful");
  }
}

//Deleting Client//

function delClient(req, res) {
  const clientEmail = req.body.email;
  const client = validateEmail(clientEmail);
  const newClient = req.body;
  if (client) {
    clients.splice(newClient, 1);
    res.status(200).json({
      message: "Email Deleted",
    });
  } else {
    res.status(400).send("That email isn't registered");
  }
}

function targetClient(req, res, next) {
  const clientId = req.params.id;
  const client = searchClient(clientId);
  if (client) {
    res.status(200).json({
      status: 200,
      client,
    });
  } else next();
}

function clientList(req, res) {
  res.status(200).json({ clients: clients });
}

function handle404(req, res) {
  res
    .status(404)
    .json({ status: 404, message: "It's not a good thing if you see this" });
}

module.exports = { handle404, clientList, targetClient, addClient, delClient };
