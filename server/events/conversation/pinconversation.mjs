import checkToken from "../../Functions/CheckToken.mjs";
import { color } from "../../Functions/colors.mjs";
import { Conversation } from "../../Models/Conversation.mjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretTest = process.env.SECRET;

export const pinconversation = (socket) => {
    return async (data) => {
        try {
            const { cookies, conversation_id } = data;
            if (await checkToken(cookies)) {
                let conversation = await Conversation.findById(conversation_id);
                let userId = jwt.verify(cookies, secretTest).userId;
                if (conversation.pinnedBy.includes(userId)) {
                    conversation.pinnedBy = conversation.pinnedBy.filter((id) => id !== userId);
                } else {
                    conversation.pinnedBy.push(userId);
                }
                await conversation.save();
                socket.emit('pinconversation', { pinned: true });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}