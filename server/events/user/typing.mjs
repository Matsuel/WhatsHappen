import checkToken from "../../Functions/CheckToken.mjs";
import { color } from "../../Functions/colors.mjs";
import { Conversation } from "../../Models/Conversation.mjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const secretTest = process.env.SECRET

export const typing = (socket, connectedUsers, typingTimeouts) => {
    return async (data) => {
        try {
            const { cookies, conversation_id } = data;
            if (await checkToken(cookies)) {
                const sender_id = jwt.verify(cookies, secretTest).userId;
                const conversation = await Conversation.findById(conversation_id);
                const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];

                if (typingTimeouts[otherId]) {
                    clearTimeout(typingTimeouts[otherId]);
                }

                typingTimeouts[otherId] = setTimeout(() => {
                    if (connectedUsers[otherId]) connectedUsers[otherId].emit('typing', { typing: false, conversationId: conversation_id });
                }, 2000);
                if (connectedUsers[otherId]) connectedUsers[otherId].emit('typing', { typing: true, conversationId: conversation_id });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}