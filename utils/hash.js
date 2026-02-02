const bcrypt = require('bcryptjs');

// Function to scramble (hash) the password
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Function to check if a password matches the hash
exports.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};