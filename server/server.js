const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectMongo = require('./Functions/ConnectMongo');
const login = require('./Sockets/Login');
const register = require('./Sockets/Register');
const { getConversations, createConversation, getMessages, newMessage } = require('./Sockets/Conversations');
const getUsers = require('./Sockets/Users');


const app = express();
app.use(cors())
const server = http.createServer(app);
const io = socketIo(server, {
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

module.exports = server;