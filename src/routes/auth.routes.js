const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "User registered" });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(400).json({ message: "User not found" });

      const valid = await bcrypt.compare(password, results[0].password);
      if (!valid)
        return res.status(400).json({ message: "Invalid password" });

      const token = jwt.sign(
        { id: results[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;