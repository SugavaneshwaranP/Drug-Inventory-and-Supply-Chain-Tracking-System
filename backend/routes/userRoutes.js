const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, username, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

module.exports = router;
