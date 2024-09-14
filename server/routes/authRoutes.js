const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUsers = await User.findOne({ email });
    if (existingUsers) {
      return res.status(400).json({ message: "User already exists" });
    } else if (password.length<6) {
      return res.status(400).json({ message: "Password must be atleast of 6 characters" })
    } else {
      const checkUsernameExist = await User.findOne({ username });
      if(checkUsernameExist) {
        return res.status(400).json({ message: "Choose different username" });
      }
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username, 
      email: email,
      password: hashPassword,
    });

    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
