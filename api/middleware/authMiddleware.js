const jwt = require("jsonwebtoken");
const config = require("../config");
const { verify } = require("../middleware/authMiddleware");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid!" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "You are not authenticated!" });
  }
};

module.exports = { verify };
