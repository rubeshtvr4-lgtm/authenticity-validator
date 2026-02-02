<<<<<<< HEAD
const QRCode = require('qrcode');

exports.generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        console.error(err);
        return null;
    }
=======
const QRCode = require('qrcode');

exports.generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        console.error(err);
        return null;
    }
>>>>>>> 04e92bd834593c8fa4360410d354b0903e4d7c24
};