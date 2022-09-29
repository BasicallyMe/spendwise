const express = require("express");
require('dotenv').config();

// importing global middlewares
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// importing custom middlewares
const User = require('./model/user');
const Database = require('./model/database');

// PORT used by Heroku app
const PORT = process.env.PORT || 5000;
const app = express();

//body parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:1234",
      "https://thexpensetracker.herokuapp.com/",
    ],
    credentials: true,
  })
);

// serving static files from the client directory
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post("/user/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.createUser({email, password, firstName, lastName});

    if (user?.error) {
      return res.status(401).json(user).end();
    }
    
    const databaseCreated = await Database.createUserDatabase(user);
    
    res.cookie("registered", email, {
      maxAge: 20000,
    });
    res.cookie("uid", password, {
      maxAge: 20000,
    });
    res.status(201).json(user).end();
  } catch (err) {
    res.status(404).json({ message: "Couldn't create account" }).end();
  }
});

app.post("/user/signin", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = {email, password};
    res.cookie('uid', password, {
      maxAge: 20000,
    });
    res.status(202).json(user).end();
  } catch(err) {
    res.status(400).json({message: "Couldn't sign in to your account. Please try again"}).end();
  }
})

app.delete("/user/signout", (req, res) => {
  res.clearCookie('uid');
  res.status(200).end();
}) 

app.get("/user/data", (req, res) => {
  res.status(200).json({ data: "This is some private data" }).end();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/dist/index.html"));
});

app.listen(PORT);
