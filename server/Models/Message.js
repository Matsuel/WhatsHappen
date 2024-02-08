const mongoose = require('mongoose');

const Message = mongoose.model('Message', new mongoose.Schema({
    sender_id: String,
    conversation_id: String,
    date: String,
    content: String,
}));

module.exports = Message;