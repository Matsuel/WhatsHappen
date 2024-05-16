import { color } from "../../Functions/colors.mjs";
import jwt from 'jsonwebtoken';
import { Conversation } from "../../Models/Conversation.mjs";
import { getConversationsInfos, sortConversations } from "../../Functions/conversation.mjs";
import checkToken from "../../Functions/CheckToken.mjs";
import dotenv from 'dotenv';

dotenv.config();
const secretTest = process.env.SECRET;

export const conversations = (socket, connectedUsers) => {
    return async (data) => {
        try {
            const { cookies } = data
            if (await checkToken(cookies)) {
                let userId = jwt.verify(cookies, secretTest).userId;
                let conversations = await Conversation.find({ users_id: userId }).sort({ last_message_date: -1 });
                conversations = await getConversationsInfos(conversations, userId, connectedUsers);
                conversations = sortConversations(conversations, userId);
                socket.emit('conversations', { conversations: conversations });
            } else {
                socket.emit('conversations', { conversations: [] });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}