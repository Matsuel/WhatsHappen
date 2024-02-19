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
    content: { type: String, required: false },
    type: { type: String, required: true },
    fileName : { type: String, required: false },
    fileContent : { type: String, required: false },
    fileExtension : { type: String, required: false },
});

export {Message, MessageSchema};