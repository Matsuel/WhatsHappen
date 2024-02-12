import express from 'express';
import { createServer } from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import {connectMongo} from './Functions/ConnectMongo.mjs';
import {login} from './Sockets/Login.mjs';
import {register} from './Sockets/Register.mjs';
import { getConversations, createConversation, getMessages, newMessage } from './Sockets/Conversations.mjs';
import {getUsers} from './Sockets/Users.mjs';
import {Message, MessageSchema} from './Models/Message.mjs';
import {Conversation} from './Models/Conversation.mjs';
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
                if (connectedUsers[otherId]) connectedUsers[otherId].emit('typing', { typing: false, conversationId : conversation_id });
            }, 2000);
            if (connectedUsers[otherId]) connectedUsers[otherId].emit('typing', { typing: true, conversationId : conversation_id });
        }
    })

    socket.on('newmessage', async (data) => {
        const { cookies, conversation_id, content } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            let MessageModel = mongoose.model('Messages'+conversation_id);
            let message ={ sender_id, conversation_id, date: new Date().toISOString(), content };
            await MessageModel.create(message);
            let conversation = await Conversation.findById(conversation_id);
            conversation.last_message_date = new Date().toISOString();
            await conversation.save();
            socket.emit('newmessage', { sent: true });
            otherSynchroMessage(cookies, conversation_id);
        } else {
            socket.emit('newmessage', { sent: false });
        }
    })

    async function otherSynchroMessage (cookies, conversation_id) {
        const sender_id = jwt.verify(cookies, secretTest).userId;
        const conversation = await Conversation.findById(conversation_id);
        const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];
        const M = mongoose.model('Messages'+conversation_id);
        if (connectedUsers[otherId]) connectedUsers[otherId].emit('syncmessages', {messages : await M.find()});
    }



    login(socket);
    register(socket);
    getConversations(socket);
    createConversation(socket);
    getMessages(socket);
    // newMessage(socket); 

    getUsers(socket);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});

export {server, connectedUsers}