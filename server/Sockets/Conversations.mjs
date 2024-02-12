const secretTest = "84554852585915452156252015015201520152152252"
import {Conversation} from '../Models/Conversation.mjs';
import {User} from '../Models/User.mjs';
import jwt from 'jsonwebtoken';
import {Message, MessageSchema} from '../Models/Message.mjs';
import checkToken from '../Functions/CheckToken.mjs';
import mongoose from 'mongoose';



function getConversations(socket) {
    socket.on('conversations', async (data) => {
        const { cookies } = data
        if (await checkToken(cookies)) {
            let userId = jwt.verify(cookies, secretTest).userId;
            let conversations = await Conversation.find({ users_id: userId });
            conversations = await Promise.all(conversations.map(async (conversation) => {
                let otherUserId = conversation.users_id.filter((id) => id !== userId)[0];
                let otherUser = await User.findById(otherUserId);
                return { ...conversation.toObject(), name: otherUser.username };
            }))
            socket.emit('conversations', { conversations: conversations });
        } else {
            socket.emit('conversations', { conversations: [] });
        }
    })
}

function createConversation(socket) {
    socket.on('newconversation', async (data) => {
        const { cookies, user_id } = data;
        if (await checkToken(cookies)) {
            let creatorId = jwt.verify(cookies, secretTest).userId;
            if (await Conversation.findOne({ users_id: [creatorId, user_id] })) return socket.emit('newconversation', { created: false });
            if (await Conversation.findOne({ users_id: [user_id, creatorId] })) return socket.emit('newconversation', { created: false });
            let conversation = new Conversation({ users_id: [creatorId, user_id], type: 'single' });
            await conversation.save();
            let conv = mongoose.model('Messages'+conversation._id, MessageSchema);
            conv.createCollection();
            socket.emit('newconversation', { created: true });
        } else {
            socket.emit('newconversation', { created: false });
        }
    })
}

function getMessages(socket) {
    socket.on('conversationmessages', async (data) => {
        const { cookies, conversation_id } = data;
        if (await checkToken(cookies)) {
            const MessageModel = mongoose.model('Messages'+conversation_id, MessageSchema);
            let messages = await MessageModel.find();
            socket.emit('conversationmessages', { messages: messages });
        } else {
            socket.emit('conversationmessages', { messages: [] });
        }
    })
}

function newMessage(socket) {
    socket.on('newmessage', async (data) => {
        const { cookies, conversation_id, content } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            let message = new Message({ sender_id, conversation_id, date: new Date().toISOString(), content });
            await message.save();
            socket.emit('newmessage', { sent: true });
        } else {
            socket.emit('newmessage', { sent: false });
        }
    })
}

export { getConversations, createConversation, getMessages, newMessage };