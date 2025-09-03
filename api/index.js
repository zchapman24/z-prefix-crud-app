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
  knex("item")
    .select("*")
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
  const { item_name, description, quantity, userid } = request.body;

  if (!item_name || !description || userid == null || quantity == null) {
    return response.status(400).json({
      message: "item_name, description, quantity, and userid are required",
    });
  }

  const quant = Number.parseInt(quantity, 10);
  if (!Number.isInteger(quant) || quant < 0) {
    return response
      .status(400)
      .json({ message: "quantity must be 0 or greater" });
  }

  const newItem = { item_name, description, quantity: quant, userid };

  knex("item")
    .insert(newItem)
    .then((data) => response.status(201).json({ id: data[0], ...newItem }))
    .catch((err) => response.status(500).json({ error: err.message }));
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

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  knex("users")
    .where({ username, password })
    .first()
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message: "Invalid login",
        });
      res.json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/users/register", function (req, res) {
  const { first_name, last_name, username, password } = req.body;
  if (!first_name || !last_name || !username || !password) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }
  knex("users")
    .insert({ first_name, last_name, username, password })
    .returning(["id", "first_name", "last_name", "username"])
    .then(([newUser]) => {
      res.json(newUser);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/myinventory/:userid", (req, res) => {
  const userId = Number.parseInt(req.params.userid, 10);
  if (!Number.isInteger(userId)) {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  knex("item")
    .select("id", "item_name", "description", "quantity", "userid")
    .where({ userid: userId })
    .orderBy("id", "desc")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});
