import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectMongo } from './Functions/ConnectMongo.mjs';
import { login } from './Sockets/Login.mjs';
import { register } from './Sockets/Register.mjs';
import { getConversations, createConversation, getMessages, newMessage, pinConversation, getConversationsInfos, sortConversations } from './Sockets/Conversations.mjs';
import { getUsers } from './Sockets/Users.mjs';
import { Message, MessageSchema } from './Models/Message.mjs';
import { Conversation } from './Models/Conversation.mjs';
import jwt from 'jsonwebtoken';
import checkToken from './Functions/CheckToken.mjs';
import mongoose from 'mongoose';
const secretTest = "84554852585915452156252015015201520152152252"


const app = express();
app.use(cors())
const server = createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

let connectedUsers = {};
let typingTimeouts = {};

connectMongo();

io.on('connection', (socket) => {

    socket.on('synchro', (data) => {
        if (!connectedUsers[data.userId]) {
            connectedUsers[data.userId] = socket;
            console.log(Object.keys(connectedUsers));
        }
    })

    socket.on('disconnect', () => {
        for (let [key, value] of Object.entries(connectedUsers)) {
            if (value === socket) {
                delete connectedUsers[key];
            }
        }
    })

    socket.on('typing', async (data) => {
        const { cookies, conversation_id } = data;
        if (checkToken(cookies)) {
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
    })

    socket.on('newmessage', async (data) => {
        console.log(data);
        const { cookies, conversation_id, content, files } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            content !== "" ? await saveMessage(conversation_id, content, sender_id) : null;
            files.length > 0 ? await saveFiles(conversation_id, sender_id, files) : null;
            socket.emit('newmessage', { sent: true });
            otherSynchroMessage(cookies, conversation_id);
        } else {
            socket.emit('newmessage', { sent: false });
        }
    })

    async function saveMessage(conversation_id, content, sender_id) {
        let MessageModel = mongoose.model('Messages' + conversation_id);
        let message = { sender_id, conversation_id, date: new Date().toISOString(), content, type: "text" };
        await MessageModel.create(message);
        let conversation = await Conversation.findById(conversation_id);
        conversation.last_message_date = new Date().toISOString();
        conversation.last_message_content = content;
        conversation.last_message_sender = sender_id;
        await conversation.save();
    }

    async function saveFiles(conversation_id, sender_id, files) {
        console.log(files);
        let MessageModel = mongoose.model('Messages' + conversation_id);
        for (const file of files) {
            let message = {
                sender_id,
                conversation_id,
                date: new Date().toISOString(),
                content: "",
                type: "file",
                fileName: file.name,
                fileContent: file.content,
                fileExtension: file.extension,
                fileType: file.type
            };
            await MessageModel.create(message);
            let conversation = await Conversation.findById(conversation_id);
            conversation.last_message_date = new Date().toISOString();
            conversation.last_message_content = "File";
            conversation.last_message_sender = sender_id;
            await conversation.save();
        }
    }


    async function otherSynchroMessage(cookies, conversation_id) {
        const sender_id = jwt.verify(cookies, secretTest).userId;
        const conversation = await Conversation.findById(conversation_id);
        const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];
        const M = mongoose.model('Messages' + conversation_id);
        let conversations = await Conversation.find({ users_id: sender_id }).sort({ last_message_date: -1 });
        conversations = await getConversationsInfos(conversations, sender_id);
        conversations = sortConversations(conversations, sender_id);
        if (connectedUsers[otherId]) connectedUsers[otherId].emit('syncmessages', { messages: await M.find(), conversations: conversations });
    }

    socket.on('synchrostatus', async (data) => {
        let status = {};
        const conversationList = await Conversation.find({ users_id: data.userId });
        for (const conversation of conversationList) {
            const otherId = conversation.users_id.filter((id) => id !== data.userId)[0];
            if (connectedUsers[otherId]) {
                status[conversation._id] = true;
            } else {
                status[conversation._id] = false;
            }
        }
        socket.emit('synchrostatus', { status });
    })

    socket.on('deletemessage', async (data) => {
        console.log(data);
        const { cookies, message_id, conversationActive } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            let MessageModel = mongoose.model('Messages' + conversationActive);
            const messageToDelete = await MessageModel.findById(message_id);
            messageToDelete.sender_id === sender_id ? await MessageModel.deleteOne({ _id: message_id }) : null;
            let lastMessage = await MessageModel.findOne().sort({ date: -1 });
            let conversation = await Conversation.findById(conversationActive);
            conversation.last_message_date = lastMessage ? lastMessage.date : null;
            conversation.last_message_content = lastMessage ? lastMessage.content : null;
            conversation.last_message_sender = lastMessage ? lastMessage.sender_id : null;
            await conversation.save();
            otherSynchroMessage(cookies, conversationActive);
            socket.emit('deletemessage', { deleted: true });
        }
    })

    socket.on('reaction', async (data) => {
        console.log(data);
        const { cookies, message_id, reaction_id, conversationActive } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            let MessageModel = mongoose.model('Messages' + conversationActive);
            let message = await MessageModel.findById(message_id);
            if (message.reactions) {
                const reactionIndex = message.reactions.findIndex((reaction) => reaction.user_id === sender_id);
                if (reactionIndex === -1) {
                    message.reactions.push({ user_id: sender_id, reaction: reaction_id });
                } else {
                    if (message.reactions[reactionIndex].reaction === reaction_id) {
                        message.reactions.splice(reactionIndex, 1);
                    }else {
                        message.reactions[reactionIndex].reaction = reaction_id;
                    }
                }
            }else {
                message.reactions = [{ user_id: sender_id, reaction: reaction_id }];
            }
            await message.save();
            socket.emit('reaction', { reacted: true });
            otherSynchroMessage(cookies, conversationActive);
        }
        socket.emit('reaction', { reacted: false });
    })



    login(socket);
    register(socket);
    getConversations(socket);
    createConversation(socket);
    getMessages(socket);
    pinConversation(socket);
    // newMessage(socket); 

    getUsers(socket);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});

export { server, connectedUsers }