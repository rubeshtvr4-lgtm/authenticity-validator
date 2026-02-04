const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

// REGISTER (POST /api/auth/register)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Create new user
        const user = new User({ username, email, password });
        await user.save();
        
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user" });
    }
});

// LOGIN (POST /api/auth/login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 2. Check password (Direct comparison for simplicity)
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Success - Return a fake token and the username
        const token = "demo_token_" + user._id;
        res.json({ 
            token: token, 
            user: { username: user.username } 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
// Update for deployment v2