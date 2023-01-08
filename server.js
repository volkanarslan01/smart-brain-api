const e = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    port: 5432,
    password: "volkan123",
    database: "smartBrainDB",
  },
});

const database = {
  users: [
    {
      id: 1,
      name: "Jhon",
      email: "jhon@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 2,
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.post("/signin", (req, res) => {
  // bcrypt.compare(
  //   "bacon",
  //   "$2a$10$57R5PLXycGHB.wvUmcbVZOha4tqQmdx.GsP2c/urZQ/IjBUMzhsHW",
  //   (err, res) => {
  //     console.log("First Guess", res);
  //   }
  // );
  // bcrypt.compare(
  //   "veggies",
  //   "$2a$10$57R5PLXycGHB.wvUmcbVZOha4tqQmdx.GsP2c/urZQ/IjBUMzhsHW",
  //   (err, res) => {
  //     console.log("second Guess", res);
  //   }
  // );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
    res.json("succesful");
  } else {
    res.status(404).json("error loggin in");
  }
});

app.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  db("users")
    .returning("*")
    .insert({ email: email, name: name, joined: new Date() })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => {
      res.status(400).json("Unable to register");
    });
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({
      id: id,
    })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(404).json("Not Found");
      }
    })
    .catch((err) => res.status(400).json("err getting user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
});

app.get("/", (req, res) => {
  res.send(database.users);
});

app.listen(3007, () => {
  console.log("App is running on port 3007");
});
