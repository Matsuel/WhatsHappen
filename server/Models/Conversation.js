const mongoose = require('mongoose');

const Conversation = mongoose.model('Conversation', new mongoose.Schema({
    users_id: Array,
    type: String,
}));

module.exports = Conversation;