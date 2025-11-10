
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (Local Compass)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/testDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected (Compass Local)"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ User Schema & Model
const User = mongoose.model(
  "employees",
  new mongoose.Schema({
    name: String,
    password: String,
    age: Number,
  })
);

// 🧾 Show all users (name + age only)
app.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name age");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 Register User
app.post("/register", async (req, res) => {
  try {
    const { name, age, password } = req.body;

    if (!name || !age || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, age, password: hashedPassword });
    await user.save();

    res.json({ message: "✅ User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔑 Login User
app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ error: "❌ User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "❌ Incorrect password" });
    }

    res.json({
      message: "✅ Login successful",
      user: { name: user.name, age: user.age },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
