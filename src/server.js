require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("IHMS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});