const e = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const app = express();
app.use(bodyParser.json());

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
  bcrypt.compare(
    "bacon",
    "$2a$10$57R5PLXycGHB.wvUmcbVZOha4tqQmdx.GsP2c/urZQ/IjBUMzhsHW",
    (err, res) => {
      console.log("First Guess", res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$57R5PLXycGHB.wvUmcbVZOha4tqQmdx.GsP2c/urZQ/IjBUMzhsHW",
    (err, res) => {
      console.log("second Guess", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database / users[0].password
  ) {
    res.json("succesful");
  } else {
    res.status(404).json("error loggin in");
  }
});

app.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  //!   bcrypt.hash(password, null, null, (err, hash) => {
  //     console.log(hash);
  //   });
  database.users.push({
    id: 3,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.send(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id == id) {
      found = true;
      return res.json(user);
    }
    if (!found) {
      res.status(404).json("Not Found");
    }
  });
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id == id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
    if (!found) {
      res.status(404).json("Not Found");
    }
  });
});

app.get("/", (req, res) => {
  res.send(database.users);
});

app.listen(3007, () => {
  console.log("App is running on port 3007");
});
