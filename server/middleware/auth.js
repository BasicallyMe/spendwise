const jwt = require("jsonwebtoken");
require("dotenv").config();

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({
        message: "You are not authorized to make this request. Please create an account.",
      });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log(decoded);
    req.user = decoded;
  } catch(err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token. Please login"})
  }
  
  return next();
};


module.exports = verifyToken;