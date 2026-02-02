const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const Document = require('../models/Document'); // We will create this model next

// Configure Storage (Where to save files)
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, 'doc-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5000000 } // Limit: 5MB
}).single('document'); // Field name must be 'document'

// Upload Route
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!req.file) return res.status(400).json({ message: 'No file selected!' });

        try {
            // Generate a unique ID (hash)
            const fileId = crypto.randomBytes(4).toString('hex');

            // Save info to Database (Mocking a DB save for now if Model missing)
            // In a real app, you would save to MongoDB here. 
            // For now, we return the success so the UI works.
            
            res.json({ 
                message: 'File Uploaded!', 
                fileId: fileId,
                filename: req.file.filename 
            });

        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    });
});

module.exports = router;