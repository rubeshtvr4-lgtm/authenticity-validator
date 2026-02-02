// Restarting server...
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files (CSS, Images)
app.use(express.static('views'));  // Serve HTML files

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Connection Error:", err));

// Routes
const authRoutes = require('./routes/authroutes'); // Ensure filename matches exactly
const uploadRoutes = require('./routes/uploadroutes');
const verifyRoutes = require('./routes/verifyroutes'); // If you have this file

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/verify', verifyRoutes); 

// Serve Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));