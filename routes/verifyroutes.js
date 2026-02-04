const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// VERIFY DOCUMENT (GET /api/verify/:id)
router.get('/:id', async (req, res) => {
    try {
        const docId = req.params.id;

        // 1. Search database for the File ID
        const document = await Document.findOne({ fileId: docId });

        // 2. If found, return details
        if (document) {
            res.json({
                success: true,
                filename: document.filename,
                uploadDate: document.uploadDate,
                status: "Verified" // You can change this logic later if needed
            });
        } else {
            // 3. If not found, return error
            res.status(404).json({ success: false, message: "Document not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
// Update for deployment v2