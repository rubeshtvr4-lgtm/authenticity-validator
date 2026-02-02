const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse'); 

// Ensure 'uploads' folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure Storage
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: function(req, file, cb) {
        cb(null, 'doc-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('file');

// --- FIXED SECURITY CHECK ---
function checkFileType(file, cb){
    // 1. Check Extension (Allow .txt or .pdf)
    const allowedExts = /txt|pdf/;
    const extname = allowedExts.test(path.extname(file.originalname).toLowerCase());

    // 2. Check Mime Type (Allow text/plain, application/pdf, etc.)
    // We added 'text' and 'plain' so it accepts standard text files
    const allowedMimes = /txt|pdf|text|plain/; 
    const mimetype = allowedMimes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        console.log("Rejected File:", file.originalname, "Mime:", file.mimetype); // Log for debugging
        cb('Error: Only .txt and .pdf files are allowed!');
    }
}

// POST: Handle Upload & Verification
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if(err){
            return res.status(400).json({ message: err });
        } 
        
        if(req.file == undefined){
            return res.status(400).json({ message: 'No file selected!' });
        }

        try {
            const filePath = req.file.path;
            const fileExt = path.extname(req.file.originalname).toLowerCase();
            let fileContent = "";

            if (fileExt === '.pdf') {
                const dataBuffer = fs.readFileSync(filePath);
                const pdfData = await pdfParse(dataBuffer);
                fileContent = pdfData.text; 
            } else {
                fileContent = fs.readFileSync(filePath, 'utf8');
            }

            // Mock Verification Score
            const plagiarismScore = Math.floor(Math.random() * 50); 

            res.json({
                message: 'File Uploaded & Verified!',
                filename: req.file.filename,
                plagiarismScore: plagiarismScore
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error: ' + error.message });
        }
    });
});

module.exports = router;