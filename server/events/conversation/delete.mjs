import checkToken from "../../Functions/CheckToken.mjs";
import { Conversation } from "../../Models/Conversation.mjs";
import { MessageSchema } from "../../Models/Message.mjs";
import mongoose from 'mongoose';

export const deleteConversation = (socket) => {
    return async (data) => {
        const {cookies, conversation_id} = data;
        if (await checkToken(cookies)) {
            await Conversation.deleteOne({_id: conversation_id});
            const MessageModel = mongoose.model('Messages' + conversation_id, MessageSchema);
            await MessageModel.deleteMany();
            socket.emit('deleteconversation', {conversation_id: conversation_id});
        }
    }
}