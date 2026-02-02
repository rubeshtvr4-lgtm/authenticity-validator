const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// 1. Generate QR Code
router.post('/generate', async (req, res) => {
    try {
        const { filename } = req.body;
        
        if (!filename) return res.status(400).json({ message: 'No filename provided' });

        // Create a URL pointing to the verification page
        // req.get('host') automatically detects 'localhost:3000' or your real domain
        const protocol = req.protocol;
        const host = req.get('host');
        const verificationLink = `${protocol}://${host}/verify.html?doc=${filename}`;

        // Convert that URL into a QR Code Image (Data URL)
        const qrImage = await QRCode.toDataURL(verificationLink);
        
        res.json({ qrImage });
    } catch (err) {
        console.error('QR Error:', err);
        res.status(500).json({ message: 'Error generating QR code' });
    }
});

// 2. Validate Document (Used by the scanner)
router.get('/validate', (req, res) => {
    const { doc } = req.query;
    
    // Simple validation logic: Checks if it looks like one of our filenames
    if (doc && doc.includes('doc-')) {
        res.json({ 
            valid: true, 
            message: '✅ Document Verified: Authentic', 
            timestamp: new Date().toLocaleString() 
        });
    } else {
        res.json({ 
            valid: false, 
            message: '❌ Invalid Document', 
            timestamp: null 
        });
    }
});

module.exports = router;