import mongoose from 'mongoose';

const Conversation = mongoose.model('Conversation', new mongoose.Schema({
    users_id: Array,
    type: String,
    last_message_date: Date,
    pinnedBy: Array,
    last_message_content: String,
    last_message_sender: String
}));

export {Conversation};