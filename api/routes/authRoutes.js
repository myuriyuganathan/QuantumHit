const express = require("express");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { generateAccessToken, generateRefreshToken } = require("../utils/authUtils");
const config = require("../config");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Please try again later." },
});



router.post("/signup", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username.trim()]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username.trim(), hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username.trim()]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Username not found!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect password!" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await pool.query(
      "UPDATE users SET refresh_token = $1 WHERE id = $2",
      [refreshToken, user.id]
    );
   

    res.json({
      username: user.username,
      accessToken,
      refreshToken,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/refresh", async (req, res) => {
  const { token: refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "You are not authenticated!" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE refresh_token = $1", [refreshToken]);
    const user = result.rows[0];

    if (!user) {
      return res.status(403).json({ error: "Refresh token is not valid!" });
    }

    jwt.verify(refreshToken, config.JWT_REFRESH_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).json({ error: "Refresh token is not valid!" });
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [newRefreshToken, user.id]);

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/logout", async (req, res) => {
  const { token: refreshToken } = req.body;

  try {
    await pool.query("UPDATE users SET refresh_token = NULL WHERE refresh_token = $1", [refreshToken]);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
