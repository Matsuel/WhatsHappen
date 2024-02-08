import mongoose from 'mongoose';

const Conversation = mongoose.model('Conversation', new mongoose.Schema({
    users_id: Array,
    type: String,
}));

export {Conversation};