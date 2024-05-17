import mongoose from "mongoose";
import { color } from "../../Functions/colors.mjs";
import { Conversation } from "../../Models/Conversation.mjs";
import jwt from 'jsonwebtoken';
import checkToken from "../../Functions/CheckToken.mjs";
import dotenv from 'dotenv';
import { MessageSchema } from "../../Models/Message.mjs";

dotenv.config();
const secretTest = process.env.SECRET;

export const newConversation = (socket) => {
    return async (data) => {
        try {
            const { cookies, user_id } = data;
            if (await checkToken(cookies)) {
                let creatorId = jwt.verify(cookies, secretTest).userId;
                if (await Conversation.findOne({ users_id: [creatorId, user_id] })) return socket.emit('newconversation', { created: false });
                if (await Conversation.findOne({ users_id: [user_id, creatorId] })) return socket.emit('newconversation', { created: false });
                let conversation = new Conversation({ users_id: [creatorId, user_id], type: 'single', last_message_date: new Date().toISOString()});
                await conversation.save();
                let conv = mongoose.model('Messages' + conversation._id, MessageSchema);
                conv.createCollection();
                socket.emit('newconversation', { created: true });
            } else {
                socket.emit('newconversation', { created: false });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}