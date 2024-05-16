import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connectMongo } from './Functions/ConnectMongo.mjs';
import { color } from './Functions/colors.mjs';
import { login } from './events/user/login.mjs';
import { register } from './events/user/register.mjs';
import { deleteMessage } from './events/message/deleteMessage.mjs';
import { newMessage } from './events/message/newMessage.mjs';
import { conversations } from './events/conversation/conversations.mjs';
import { newConversation } from './events/conversation/newConversation.mjs';
import { messages } from './events/conversation/messages.mjs';
import { pinconversation } from './events/conversation/pinconversation.mjs';
import { search } from './events/user/search.mjs';
import { otherinfos } from './events/user/otherInfos.mjs';
import { reaction } from './events/message/reaction.mjs';
import { typing } from './events/user/typing.mjs';
import { disconnect } from './events/user/disconnect.mjs';
import { join } from './events/user/join.mjs';
import { synchroStatut } from './events/user/synchrostatut.mjs';


const app = express();
app.use(cors())
const server = createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    },
    maxHttpBufferSize: 1e9
});

let connectedUsers = {};
let typingTimeouts = {};

connectMongo();

io.on('connection', (socket) => {
    socket.on('synchro', join(socket, connectedUsers));
    socket.on('disconnect', disconnect(socket, connectedUsers));
    socket.on('typing', typing(socket, connectedUsers, typingTimeouts));
    socket.on('newmessage', newMessage(socket, connectedUsers));
    socket.on('synchrostatus', synchroStatut(socket, connectedUsers));
    socket.on('deletemessage', deleteMessage(socket, connectedUsers));
    socket.on('reaction', reaction(socket, connectedUsers));
    socket.on('otherinfos', otherinfos(socket));
    socket.on('login', login(socket));
    socket.on('register', register(socket));
    socket.on('conversations', conversations(socket, connectedUsers));
    socket.on('newconversation', newConversation(socket));
    socket.on('conversationmessages', messages(socket));
    socket.on('pinconversation', pinconversation(socket));
    socket.on('searchusers', search(socket));
});

server.listen(3001, () => {
    console.log(color('success','Server is running on port 3001'));
});

export { server, connectedUsers }