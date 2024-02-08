const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    mail: String,
    password: String,
}));

module.exports = User;