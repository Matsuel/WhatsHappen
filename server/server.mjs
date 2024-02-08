import express from 'express';
import { createServer } from 'http';
import {Server} from 'socket.io';
import cors from 'cors';
import {connectMongo} from './Functions/ConnectMongo.mjs';
import {login} from './Sockets/Login.mjs';
import {register} from './Sockets/Register.mjs';
import { getConversations, createConversation, getMessages, newMessage } from './Sockets/Conversations.mjs';
import {getUsers} from './Sockets/Users.mjs';


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

connectMongo();

io.on('connection', (socket) => {
    login(socket);
    register(socket);
    getConversations(socket);
    createConversation(socket);
    getMessages(socket);
    newMessage(socket); 
    getUsers(socket);
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});

export default server;