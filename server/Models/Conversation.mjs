import mongoose from 'mongoose';

const Conversation = mongoose.model('Conversation', new mongoose.Schema({
    users_id: Array,
    type: String,
    last_message_date: Date,
    pinnedBy: Array
}));

export {Conversation};