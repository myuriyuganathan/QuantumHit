const express = require("express");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");
const { generateAccessToken, generateRefreshToken } = require("../utils/authUtils");
const config = require("../config");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const { verify } = require("../middleware/authMiddleware");

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
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username.trim(), hashedPassword]
    );

    const user = result.rows[0];
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);

    await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [hashedRefresh, user.id]);

    res.status(201).json({
      message: "User registered and logged in successfully",
      username: user.username,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username.trim()]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: "Username not found!" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: "Incorrect password!" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);

    await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [hashedRefresh, user.id]);

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
    const result = await pool.query("SELECT * FROM users WHERE refresh_token IS NOT NULL");
    const user = result.rows.find(u => bcrypt.compareSync(refreshToken, u.refresh_token));

    if (!user) {
      return res.status(403).json({ error: "Refresh token is not valid!" });
    }

    jwt.verify(refreshToken, config.JWT_REFRESH_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).json({ error: "Session expired. Please log in again." });
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      const hashedNewRefresh = await bcrypt.hash(newRefreshToken, 10);

      await pool.query("UPDATE users SET refresh_token = $1 WHERE id = $2", [hashedNewRefresh, user.id]);

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
    await pool.query("UPDATE users SET refresh_token = NULL WHERE refresh_token IS NOT NULL");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/protected", verify, (req, res) => {
  res.json({ message: `Hello, ${req.user.id}. You are authenticated.` });
});

module.exports = router;
