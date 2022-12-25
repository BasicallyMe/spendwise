const express = require("express");
require("dotenv").config();

// importing global middlewares
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const object = require("lodash/fp/object");
const { isEmpty } = require("lodash");

// importing custom middlewares
const User = require("./model/user");
const Database = require("./model/database");
const auth = require("./middleware/auth");

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
      switch (user.error) {
        case "auth/email-already-in-use":
          return res
            .json({
              message:
                "Do you have an evil twin, because this email is already in use. Please try a different one.",
            })
            .end();
        default:
          return res
            .json({
              message:
                "Your account couldn't be created. Please make sure we've got your details right.",
            })
            .end();
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
    res
      .status(404)
      .json({
        message:
          "Your account couldn't be created. Please make sure we've got your details right.",
      })
      .end();
  }
});

app.post("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.signInUser({ email, password });

    if (user?.error) {
      res.status(401);
      switch (user.error) {
        case "auth/wrong-password":
          return res
            .json({
              message:
                "The wizard thinks your password might be wrong. Please try a different one.",
            })
            .end();
        case "auth/user-not-found":
          return res
            .json({
              message:
                "The wizard couldn't find an account with this email. Please try a different one.",
            })
            .end();
        default:
          return res
            .json({
              message:
                "The wizard couldn't recognise you. Please make sure we've got your details right.",
            })
            .end();
      }
    }

    const data = await Database.getUserData(user.uid);

    user = object.merge(user, data);

    const token = jwt.sign({ uid: user.uid, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.cookie("registered", user.email, {
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("uid", password, {
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json(user).end();
  } catch (err) {
    res
      .status(400)
      .json({
        message:
          "Sorry, we couldn't sign you in. Please make sure we've got your details right.",
      })
      .end();
  }
});

app.delete("/user/signout", (req, res) => {
  res.clearCookie("uid");
  res.clearCookie("token");
  res.status(200).end();
});

app.get("/user/data", auth, async (req, res) => {
  try {
    const user = await Database.getUserData(req.user.uid);
    res.status(200).json(user).end();
  } catch (err) {
    res.status(400).json({ message: "Couldn't find data" }).end();
  }
});

app.post("/user/transaction/new", auth, async (req, res) => {
  try {
    const response = await Database.addTransaction(req.user.uid, req.body);
    if (response !== true) {
      return res
        .status(400)
        .json({
          message:
            "Your transaction couldn't be added. Please make sure we've got the right data.",
        })
        .end();
    }
    res
      .status(200)
      .json({ message: "Your transaction has been added successfully." })
      .end();
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        message:
          "Your transaction couldn't be added. Please make sure we've got the right data.",
      })
      .end();
  }
});

app.get("/user/transaction", auth, async (req, res) => {
  try {
    const data = await Database.getTransactions(req.user.uid);

    if (data === false) {
      return res
        .status(400)
        .json({
          message:
            "Sorry, we couldn't get your records. Click the button below to try again.",
        })
        .end();
    }

    if (isEmpty(data)) {
      return res
        .status(200)
        .json({
          message:
            "The explorers didn't find anything in the storage. Have you added any transaction yet?",
        })
        .end();
    }

    res.status(200).json({ message: "Data queried successfully", data }).end();
  } catch (err) {    
    console.log(err);
    res
      .status(400)
      .json({
        message:
          "Sorry, we couldn't get your records. Click the button below to try again.",
      })
      .end();
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/dist/index.html"));
});

app.listen(PORT);
