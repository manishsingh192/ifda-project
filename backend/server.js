// 📦 Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // 🔐 Load env variables

// 🏁 Initialize app
const app = express();
const PORT = process.env.PORT || 4000;

// 🛡️ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Welcome to the backend of IFDA API");
});

// 🔗 MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected..."))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🧾 Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  courseName: String,
});

// 🧑‍💼 User Model
const User = mongoose.model("User", userSchema);

// 📬 POST: Add user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 GET: Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
