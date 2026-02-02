const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// POST: Generate QR Code for a file
router.post('/generate', async (req, res) => {
    try {
        const { filename } = req.body;
        if (!filename) return res.status(400).json({ message: "No filename provided" });

        // Generate a QR code containing the filename (or a verification URL)
        const qrImage = await QRCode.toDataURL(filename);
        
        res.json({ qrImage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating QR code' });
    }
});

module.exports = router;