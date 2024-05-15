import mongoose from "mongoose";
import { Conversation } from "../Models/Conversation.mjs";
import { getConversationsInfos, sortConversations } from "./conversation.mjs";

export async function otherSynchroMessage(cookies, conversation_id) {
    const sender_id = jwt.verify(cookies, secretTest).userId;
    const conversation = await Conversation.findById(conversation_id);
    const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];
    const M = mongoose.model('Messages' + conversation_id);
    let conversations = await Conversation.find({ users_id: sender_id }).sort({ last_message_date: -1 });
    conversations = await getConversationsInfos(conversations, sender_id);
    conversations = sortConversations(conversations, sender_id);
    if (connectedUsers[otherId]) {
        connectedUsers[otherId].emit('syncmessages', { messages: await getLastMessage(conversation_id) });
    }
}

export async function getLastMessage(conversation_id) {
    let MessageModel = mongoose.model('Messages' + conversation_id);
    let lastMessage = await MessageModel.findOne().sort({ date: -1 });
    return lastMessage;
}