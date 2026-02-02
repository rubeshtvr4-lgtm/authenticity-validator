const QRCode = require('qrcode');

exports.generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        console.error(err);
        return null;
    }
};