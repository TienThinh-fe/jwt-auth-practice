const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(express.json());

const post = [
  {
    username: "Bob",
    title: "Post 1",
  },
  {
    username: "Tom",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(post.filter((post) => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// to create a random token
// in cmd terminal
// node
// require('crypto').randomBytes(64).toString('hex')
