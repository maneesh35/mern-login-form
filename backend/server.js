const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://maneeshm7034_db_user:odeJtYf5Hm8ScJkj@cluster0.c6ghktt.mongodb.net/testDB?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Error:", err));

// User model
const User = mongoose.model(
  "employees",
  new mongoose.Schema({
    name: String,
    password: String,
    age: Number,
  })
);

// 🆕 Show all users (just names + age)
app.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name age");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 Register user
app.post("/register", async (req, res) => {
  try {
    const { name, age, password } = req.body;

    if (!name || !password || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, password: hashed, age });

    await user.save();
    res.json({ message: "✅ User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔑 Login user
app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    res.json({ message: "✅ Login successful", user: { name: user.name, age: user.age } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
