import mongoose from "mongoose";
import { Conversation } from "../Models/Conversation.mjs";
import { getConversationsInfos, sortConversations } from "./conversation.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretTest = process.env.SECRET;

export async function otherSynchroMessage(cookies, conversation_id, connectedUsers) {
    const sender_id = jwt.verify(cookies, secretTest).userId;
    const conversation = await Conversation.findById(conversation_id);
    const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];
    const M = mongoose.model('Messages' + conversation_id);
    let conversations = await Conversation.find({ users_id: sender_id }).sort({ last_message_date: -1 });
    conversations = await getConversationsInfos(conversations, sender_id, connectedUsers);
    conversations = sortConversations(conversations, sender_id);
    if (connectedUsers[otherId]) {
        connectedUsers[otherId].emit('syncmessages', { messages: await getLastMessage(conversation_id) });
        connectedUsers[otherId].emit('syncconversations')
    }
}

export async function sendLastDeletedMessage(conversation_id, connectedUsers, message_id, sender_id) {
    const conversation = await Conversation.findById(conversation_id);
    const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];
    if (connectedUsers[otherId]) {
        connectedUsers[otherId].emit('deletemessage', { deleted: true, message_id });
        connectedUsers[otherId].emit('syncconversations')
    }
}

export async function getLastMessage(conversation_id) {
    let MessageModel = mongoose.model('Messages' + conversation_id);
    let lastMessage = await MessageModel.findOne().sort({ date: -1 });
    return lastMessage;
}

export async function saveMessage(conversation_id, content, sender_id) {
    let MessageModel = mongoose.model('Messages' + conversation_id);
    const messageDate = new Date().toISOString();
    let message = { sender_id, conversation_id, date: messageDate, content, type: "text" };
    await MessageModel.create(message);
    let conversation = await Conversation.findById(conversation_id);
    conversation.last_message_date = messageDate;
    conversation.last_message_content = content;
    conversation.last_message_sender = sender_id;
    await conversation.save();
}