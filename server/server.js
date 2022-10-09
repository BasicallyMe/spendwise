const express = require("express");
require("dotenv").config();

// importing global middlewares
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// importing custom middlewares
const User = require("./model/user");
const Database = require("./model/database");
const auth = require('./middleware/auth');

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

    const user = await User.createUser({
      email: email.trim(),
      password: password.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    if (user?.error) {
      res.status(409);
      switch(user.error) {
        case "auth/email-already-in-use": return res.json({ message: "This email is already in use"}).end();
        default: return res.json({message: "Couldn't create your account. Please try again"}).end();
      }
    }

    const databaseCreated = await Database.createUserDatabase(user);

    const token = jwt.sign({ uid: user.uid, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.cookie("registered", user.uid, {
      maxAge: 2 * 60 * 1000,
    });
    res.cookie("token", token, {
      maxAge: 2 * 60 * 1000,
      httpOnly: true,
    });

    res.status(201).json(user).end();
  } catch (err) {
    res.status(404).json({ message: "Couldn't create account" }).end();
  }
});

app.post("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.signInUser({ email, password });

    if (user?.error) {
      res.status(401);
      switch(user.error) {
        case "auth/wrong-password": return res.json({message: "You're password might be wrong. Please try again"}).end();
        case "auth/user-not-found": return res.json({message: "Couldn't find an account with this mail"}).end();
        default: return res.json({message: "Couldn't sign in to your account. Please try again"}).end();
      }
    }

    const {firstName, lastName} = await Database.getUserData(user.uid);
    user.firstName = firstName;
    user.lastName = lastName;
    console.log(user);

    const token = jwt.sign({ uid: user.uid, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.cookie("registered", user.uid, {
      maxAge: 10 * 60 * 1000,
    });

    res.cookie("uid", password, {
      maxAge: 10 * 60 * 1000,
    });
    res.cookie("token", token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json(user).end();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Couldn't sign in to your account. Please try again" })
      .end();
  }
});

app.delete("/user/signout", (req, res) => {
  res.clearCookie("uid");
  res.clearCookie("token");
  res.status(200).end();
});

app.get("/user/data", auth, (req, res) => {
  res.status(200).json({ data: "This is some private data" }).end();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/dist/index.html"));
});

app.listen(PORT);
