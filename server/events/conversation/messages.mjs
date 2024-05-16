import checkToken from "../../Functions/CheckToken.mjs";
import { color } from "../../Functions/colors.mjs";
import mongoose from 'mongoose';
import { MessageSchema } from "../../Models/Message.mjs";

export const messages = (socket) => {
    return async (data) => {
        try {
            const { cookies, conversation_id } = data;
            if (await checkToken(cookies)) {
                const MessageModel = mongoose.model('Messages' + conversation_id, MessageSchema);
                let messages = await MessageModel.find();
                socket.emit('conversationmessages', { messages: messages });
            } else {
                socket.emit('conversationmessages', { messages: [] });
            }
        } catch (error) {
            console.log(color('error', error));

        }
    }
}