const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./model/user");
const PORT = process.env.PORT || 5000;
const app = express();

//body parser
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.registerUser({
      displayName: name,
      email: email.toLowerCase(),
      password: password,
    });
    
    if (user.error) {
      return res.status(409).json({
        message: "User already exist. Please login to continue",
        error_message: user.error,
      }).end();
    }

    const token = jwt.sign(
      { user_id: user.uid, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/basket", (req, res) => {
  res.send("Hello");
});

app.listen(PORT);
