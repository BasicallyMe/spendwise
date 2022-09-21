const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("./middleware/auth");
const User = require("./model/user");
const Database = require("./model/database");
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

app.post("/user/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.registerUser({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      password: password,
    });

    if (user.error) {
      switch (user.error) {
        case "auth/email-already-in-use":
          return res
            .status(409)
            .json({
              message: "Account already exists. Please login to continue",
              error_message: user.error,
            })
            .end();
        default:
          return res
            .status(409)
            .json({
              message: "Couldn't create user account. Please try again",
              error_message: user.error,
            })
            .end();
      }
    }
    //creating user database
    const databaseCreated = await Database.createUserDatabase(user);
    if (!databaseCreated) {
      return res
        .status(500)
        .json({ message: "Couldn't create database" })
        .end();
    }

    // creating a JWT signed token
    const token = jwt.sign(
      { user_id: user.uid, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // adding token to cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.cookie("registered", user.email);
    res.cookie("uid", user.uid);

    return res.status(201).json(user).end();
  } catch (error) {
    res.status(409).json({ message: "Couldn't sign in user" }).end();
  }
});

app.post("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // fetch user data if user is registered in the server
    const user = await User.signInUser({ email, password });

    // return 401 if user doesn't exist in the database
    if (user.error) {
      return res
        .status(401)
        .json({
          message: "Account doesn't exist. Please create an account",
          error_message: user.error,
        })
        .end();
    }

    const token = jwt.sign(
      { user_id: user.uid, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // adding generated token to the cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.cookie("registered", user.email);
    res.cookie("uid", user.uid);

    // sending user data to the client
    res.status(202).json(user).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server couldn't complete the request" })
      .end();
  }
});

app.get("/user/data", auth, (req, res) => {
  res.status(200).json({ message: "Hello from server", data: req.user }).end();
});

app.delete("/user/signout", (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("uid");
    res.status(200).json({ message: "User signed out successfully" }).end();
  } catch(err) {
    res.status(404).json({message: "Couldn't sign out"}).end();
  }
});

app.get("/server/status", (req, res) => {
  res.cookie("Cookie", "Example Cookie", {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
  });
  res.status(201).json({ message: "Server is running💕✨" });
});

app.post("/server/status", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  res.json({ token: token });
});

app.listen(PORT);
