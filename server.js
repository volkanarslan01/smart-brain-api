const e = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "1",
      name: "Jhon",
      email: "jhon@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "2",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.post("/signin", (req, res) => {
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
  database.users.push({
    id: "3",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.send(console.log("Succesful"));
});

app.get("/", (req, res) => {
  res.send(database.users);
});
app.listen(3007, () => {
  console.log("App is running on port 3007");
});

/* 
--> res
? sig in --> post = success/fail
! register --> POST = user
* profile/>:userId --> GET = user
! image --> put
*/
