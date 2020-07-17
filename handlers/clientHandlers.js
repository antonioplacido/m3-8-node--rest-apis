const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

// write your handlers here...

function searchClient(id) {
  return clients.find((client) => client.id == id);
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

module.exports = { handle404, clientList, targetClient };
