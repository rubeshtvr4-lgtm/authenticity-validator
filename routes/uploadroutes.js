const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse'); 

// --- FIX 1: Ensure 'uploads' folder exists ---
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
    console.log("Created 'uploads' folder.");
}

// Configure Storage
const storage = multer.diskStorage({
    destination: uploadDir, // Use the variable
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
            // Multer Error
            console.error("Multer Error:", err);
            return res.status(400).json({ message: err });
        } 
        
        if(req.file == undefined){
            return res.status(400).json({ message: 'No file selected!' });
        }

        try {
            console.log("File uploaded:", req.file.path); // Log the path
            const filePath = req.file.path;
            const fileExt = path.extname(req.file.originalname).toLowerCase();
            let fileContent = "";

            // --- READ FILE CONTENT ---
            if (fileExt === '.pdf') {
                const dataBuffer = fs.readFileSync(filePath);
                const pdfData = await pdfParse(dataBuffer);
                fileContent = pdfData.text; 
            } else {
                fileContent = fs.readFileSync(filePath, 'utf8');
            }

            // --- VERIFICATION LOGIC ---
            // Random score for demonstration
            const plagiarismScore = Math.floor(Math.random() * 50); 

            res.json({
                message: 'File Uploaded & Verified!',
                filename: req.file.filename,
                plagiarismScore: plagiarismScore
            });

        } catch (error) {
            console.error("Processing Error:", error);
            // --- FIX 2: Send the REAL error message to the user ---
            res.status(500).json({ message: 'Error: ' + error.message });
        }
    });
});

module.exports = router;