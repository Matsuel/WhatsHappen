import mongoose from 'mongoose';

const Message = mongoose.model('Message', new mongoose.Schema({
    sender_id: String,
    conversation_id: String,
    date: String,
    content: String,
}));

const MessageSchema = new mongoose.Schema({
    sender_id: { type: String, required: true },
    conversation_id: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true }
});

export {Message, MessageSchema};