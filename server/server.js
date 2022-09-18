const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("./middleware/auth");
const User = require("./model/user");
const PORT = process.env.PORT || 5000;
const app = express();

//body parser
app.use(express.json());
app.use(cookieParser());

app.post("/user/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.registerUser({
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      password: password,
    });

    // const databaseCreated = await Database.createUserDatabase(user);
    // console.log(databaseCreated);

    if (user.error) {
      return res
        .status(409)
        .json({
          message: "User already exist. Please login to continue",
          error_message: user.error,
        })
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
          message: "User doesn't exist. Please register to create an account",
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
    res.cookie("uid", user.uid);

    // sending user data to the client
    res.status(201).json(user).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server couldn't complete the request" })
      .end();
  }
});

app.get("/user/get/data", auth, (req, res) => {
  res.status(200).json({ message: "Hello from server" }).end();
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
