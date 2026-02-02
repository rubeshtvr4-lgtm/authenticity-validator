require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- FIX: Serve files from the 'public' folder ---
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Connection Error:", err));

// Routes
const authRoutes = require('./routes/authroutes');
const uploadRoutes = require('./routes/uploadroutes');
const verifyRoutes = require('./routes/verifyroutes');

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/verify', verifyRoutes); 

// --- FIX: Send 'index.html' when opening the site ---
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));