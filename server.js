require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// 1. Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML/CSS/JS

// 2. Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ Connection Error:", err));

// 3. Import Routes
const authRoutes = require('./routes/authroutes');
const uploadRoutes = require('./routes/uploadroutes');
const verifyRoutes = require('./routes/verifyroutes');
const featureRoutes = require('./routes/featureRoutes');

// 4. Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/features', featureRoutes);

// 5. Catch-All Route (Fixes Refreshing on Sub-pages)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 6. Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));