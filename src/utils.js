const auth = require("./config/auth");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const generateToken = (payload) => {
  return jwt.sign(payload, auth.secret, { expiresIn: "1d" });
};

const useMulter = () => {
  const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024,
  });

  return Multer
}

module.exports = { generateToken, useMulter };
