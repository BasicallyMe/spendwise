const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token = await req.cookies.token;

  if (!token) {
    res.clearCookie("uid");
    res.clearCookie("token");
    return res
      .status(403)
      .json({ message: "Not authorised. Please sign in to continue" });
  }
  try {
    const decoded = await jwt.verify(token, config.TOKEN_KEY);
    req.user = await decoded;
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Not authorised to make this request" });
  }
  return next();
};

module.exports = verifyToken;
