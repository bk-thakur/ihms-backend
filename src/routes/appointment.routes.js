const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticateToken, (req, res) => {
  const { doctor_id, appointment_date } = req.body;

  db.query(
    "INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)",
    [req.user.id, doctor_id, appointment_date],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Appointment booked" });
    }
  );
});

module.exports = router;