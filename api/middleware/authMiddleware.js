const jwt = require("jsonwebtoken");
const config = require("../config");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Session expired. Please log in again." });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "You are not authenticated!" });
  }
};

module.exports = { verify };
