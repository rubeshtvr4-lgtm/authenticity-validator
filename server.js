<<<<<<< HEAD
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 1. Load Config
dotenv.config();
const app = express();

// 2. Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected...'))
    .catch(err => console.error('❌ Database Connection Error:', err));

// 3. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. API Routes
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/upload', require('./routes/uploadroutes'));
app.use('/api/verify', require('./routes/verifyroutes')); // <--- Added this

// 6. Frontend Routes (HTML Pages)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/dashboard.html', (req, res) => res.sendFile(path.join(__dirname, 'views/dashboard.html')));
app.get('/verify.html', (req, res) => res.sendFile(path.join(__dirname, 'views/verify.html'))); // <--- Added this

// 7. Start Server
const PORT = process.env.PORT || 3000;
=======
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 1. Load Config
dotenv.config();
const app = express();

// 2. Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected...'))
    .catch(err => console.error('❌ Database Connection Error:', err));

// 3. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. API Routes
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/upload', require('./routes/uploadroutes'));
app.use('/api/verify', require('./routes/verifyroutes')); // <--- Added this

// 6. Frontend Routes (HTML Pages)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/dashboard.html', (req, res) => res.sendFile(path.join(__dirname, 'views/dashboard.html')));
app.get('/verify.html', (req, res) => res.sendFile(path.join(__dirname, 'views/verify.html'))); // <--- Added this

// 7. Start Server
const PORT = process.env.PORT || 3000;
>>>>>>> 04e92bd834593c8fa4360410d354b0903e4d7c24
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));