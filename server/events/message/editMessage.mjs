import checkToken from "../../Functions/CheckToken.mjs";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import { Conversation } from "../../Models/Conversation.mjs";
import { syncAfterEdit } from "../../Functions/Message.mjs";

dotenv.config();
const secretTest = process.env.SECRET;


export const editMessage = (socket, connectedUsers) => {
    return async (data) => {
        try {
            const {cookies, message_id, content, conversation_id} = data;
            if (await checkToken(cookies)) {
                const sender_id = jwt.verify(cookies, secretTest).userId;
                let MessageModel = mongoose.model('Messages' + conversation_id);
                const messageToEdit = await MessageModel.findById(message_id);
                messageToEdit.sender_id === sender_id ? await MessageModel.updateOne({ _id: message_id }, { content: content }) : null;
                let lastMessage = await MessageModel.findOne().sort({ date: -1 });
                let conversation = await Conversation.findById(conversation_id);
                conversation.last_message_date = lastMessage ? lastMessage.date : new Date().toISOString();
                conversation.last_message_content = lastMessage ? lastMessage.content : null;
                conversation.last_message_sender = lastMessage ? lastMessage.sender_id : null;
                await conversation.save();
                await syncAfterEdit(conversation_id, connectedUsers, message_id, content, sender_id);
                socket.emit('editMessage', { edited: true, message_id: message_id, content: content });
                socket.emit('syncconversations')
            }
        } catch (error) {
            console.log(error)            
        }
    }
}