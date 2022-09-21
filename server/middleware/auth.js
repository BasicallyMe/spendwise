const jwt = require("jsonwebtoken");
const { app } = require("firebase-admin");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const config = process.env;

const verifyToken = (req, res, next) => {
  let cookie = req.headers?.cookie;
  const token = cookie
    .slice(cookie.indexOf("token"))
    .split("; ")[0]
    .split("token=")[1];

  if (!token) {
    return res
      .status(403)
      .json({
        message: "You are not authorized to make this request. Please sign in to your account",
      });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch(err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token. Please login"})
  }
  
  return next();
};


module.exports = verifyToken;