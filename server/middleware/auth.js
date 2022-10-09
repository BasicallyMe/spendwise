const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).json({ message: "Not authorised. Please sign in to continue"});
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Not authorised to make this request"});
  }
  return next();
};

module.exports = verifyToken;
