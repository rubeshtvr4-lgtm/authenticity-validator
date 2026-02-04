const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Create and Save the User
        const user = new User({ username, email, password });
        await user.save();
        
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error("Signup Error:", err); // This prints the real error to your Render logs
        res.status(500).json({ message: "Error registering user" });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (password !== user.password) return res.status(400).json({ message: "Invalid credentials" });

        const token = "demo_token_" + user._id;
        res.json({ token, user: { username: user.username } });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;