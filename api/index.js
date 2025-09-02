const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("You made it to the guitars homepage");
});

app.get("/inventory", (request, response) => {
  knex("guitar")
    .select("*")
    .from("item")
    .then((data) => response.status(200).json(data))
    .catch((error) => response.status(400).json(error));
});

app.get("/inventory/:id", (request, response) => {
  knex("item")
    .select("*")
    .where("item.id", "=", request.params.id)
    .then((data) => response.status(200).json(data))
    .catch((error) => response.status(400).json(error));
});

app.post("/inventory", (request, response) => {
  let newItem = request.body;
  if (!Object.hasOwn(newItem, "Item_Name")) {
    response.status(400).send("Must provide Item_name property");
  }
  if (!Object.hasOwn(newItem, "Description")) {
    response.status(400).send("Must provide Description property");
  }
  if (!Object.hasOwn(newItem, "Quantity")) {
    response.status(400).send("Must provide Quantity property");
  }
  if (!Object.hasOwn(newItem, "UserId")) {
    response.status(400).send("Must provide UserId property");
  }

  knex("item")
    .insert(newItem)
    .then((data) => response.status(200).send(data));
});

app.delete("/inventory/:id", (req, res) => {
  knex("item")
    .where({ id: req.params.id })
    .del()

    .then((data) => res.status(200).json(data))
    .then(() => console.log("done with the delete"))
    .catch((err) => res.status(400).json(err));
});

app.patch("/inventory/:id", (req, res) => {
  knex("item")
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => console.log("done with the patch"))
    .then((data) => res.status(200).end())
    .catch((err) => res.status(400).json(err));
});
