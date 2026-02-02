const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// --- PLAGIARISM CHECKER (Simulated) ---
router.post('/plagiarism', (req, res) => {
    const { text } = req.body;
    
    // Simulate a check (In real life, this connects to a huge database)
    // We calculate a random "Similarity Score" for demo purposes
    const score = Math.floor(Math.random() * 20); // 0% to 20% plagiarism
    
    res.json({
        score: score,
        message: score > 15 ? "High Similarity Detected!" : "Original Content",
        status: "Checked"
    });
});

// --- QR CODE GENERATOR ---
router.post('/generate-qr', async (req, res) => {
    const { docId } = req.body;
    if (!docId) return res.status(400).json({ message: "Document ID required" });

    try {
        // Generate a QR code that contains the Document ID
        const url = await QRCode.toDataURL(docId);
        res.json({ qrImage: url });
    } catch (err) {
        res.status(500).json({ message: "Error generating QR" });
    }
});

module.exports = router;