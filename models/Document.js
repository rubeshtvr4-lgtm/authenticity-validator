const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    fileId: {
        type: String,
        required: true,
        unique: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    originalName: {
        type: String
    },
    status: {
        type: String,
        default: 'Verified'
    }
});

module.exports = mongoose.model('Document', DocumentSchema);