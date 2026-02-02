<<<<<<< HEAD
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

=======
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

>>>>>>> 04e92bd834593c8fa4360410d354b0903e4d7c24
module.exports = mongoose.model('User', UserSchema);