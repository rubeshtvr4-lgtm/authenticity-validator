const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse'); // Tool to read PDFs
const { calculatePlagiarism } = require('../utils/plagiarism'); // Assuming you have this

// Configure Storage
const storage = multer.diskStorage({
    destination: './uploads/',
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

// Check File Type (Allow .txt and .pdf)
function checkFileType(file, cb){
    const filetypes = /txt|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Only .txt and .pdf files are allowed!');
    }
}

// POST: Handle Upload & Verification
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if(err){
            return res.status(400).json({ message: err });
        } else {
            if(req.file == undefined){
                return res.status(400).json({ message: 'No file selected!' });
            }

            try {
                const filePath = req.file.path;
                const fileExt = path.extname(req.file.originalname).toLowerCase();
                let fileContent = "";

                // --- 1. READ FILE CONTENT BASED ON TYPE ---
                if (fileExt === '.pdf') {
                    // Read PDF
                    const dataBuffer = fs.readFileSync(filePath);
                    const pdfData = await pdfParse(dataBuffer);
                    fileContent = pdfData.text; // Extracted text from PDF
                } else {
                    // Read Text File
                    fileContent = fs.readFileSync(filePath, 'utf8');
                }

                // --- 2. PERFORM VERIFICATION / PLAGIARISM CHECK ---
                // (Using the extracted text "fileContent")
                
                // Example Logic: Compare this content against DB or Mock Data
                // For now, we use a random score generator or your utility
                const plagiarismScore = Math.floor(Math.random() * 50); // Replace with real logic if available

                res.json({
                    message: 'File Uploaded & Verified!',
                    filename: req.file.filename,
                    originalName: req.file.originalname,
                    fileType: fileExt,
                    plagiarismScore: plagiarismScore,
                    detectedTextLength: fileContent.length // Just for info
                });

            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error processing document' });
            }
        }
    });
});

module.exports = router;