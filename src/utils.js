const auth = require("./config/auth");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, auth.secret, { expiresIn: "1d" });
};

module.exports = { generateToken };
