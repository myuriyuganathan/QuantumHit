const jwt = require("jsonwebtoken");
const config = require("../config");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isadmin },
    config.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isadmin },
    config.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
