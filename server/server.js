const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const secretTest = "84554852585915452156252015015201520152152252"
const User = require('./Models/User');
const Message = require('./Models/Message');
const Conversation = require('./Models/Conversation');
const checkToken = require('./Functions/CheckToken');
const connectMongo = require('./Functions/ConnectMongo');


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

    socket.on('login', async (data) => {
        const { email, password } = data;
        const user = await User.findOne({ $or: [{ username: email }, { mail: email }] });
        if ((user) && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '48h' });
            socket.emit('login', { validation: true, token });
        } else {
            socket.emit('login', { validation: false });
        }
    });

    socket.on('register', async (data) => {
        const { pseudo, email, password } = data;
        const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
        if (user) {
            socket.emit('register', { created: false });
        } else {
            const newUser = new User({ username: pseudo, mail: email, password: bcrypt.hashSync(password, 10) });
            await newUser.save();
            const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
            const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '1h' });
            socket.emit('register', { created: true, token });
        }
    });

    socket.on('conversations', async (data) => {
        const { cookies } = data
        if (await checkToken(cookies)) {
            let userId = jwt.verify(cookies, secretTest).userId;
            let conversations = await Conversation.find({ users_id: userId });
            conversations = await Promise.all(conversations.map(async (conversation) => {
                let otherUserId = conversation.users_id.filter((id) => id !== userId)[0];
                let otherUser = await User.findById(otherUserId);
                return { ...conversation.toObject(), name: otherUser.username };
            }))
            socket.emit('conversations', { conversations: conversations });
        } else {
            socket.emit('conversations', { conversations: [] });
        }
    })

    socket.on('newconversation', async (data) => {
        const { cookies, user_id } = data;
        if (await checkToken(cookies)) {
            let creatorId = jwt.verify(cookies, secretTest).userId;
            if (await Conversation.findOne({ users_id: [creatorId, user_id] })) return socket.emit('newconversation', { created: false });
            if (await Conversation.findOne({ users_id: [user_id, creatorId] })) return socket.emit('newconversation', { created: false });
            let conversation = new Conversation({ users_id: [creatorId, user_id], type: 'single' });
            await conversation.save();
            socket.emit('newconversation', { created: true });
        } else {
            socket.emit('newconversation', { created: false });
        }
    })

    socket.on('users', async (data) => {
        const { cookies } = data;
        if (await checkToken(cookies)) {
            let users = await User.find();
            const decoded = jwt.verify(cookies, secretTest);
            users = users.filter((user) => user.username !== decoded.pseudo);
            let conversations = await Conversation.find({ users_id: decoded.userId });
            conversations = conversations.map((conversation) => conversation.users_id);
            users = users.filter((user) => {
                let found = false;
                conversations.forEach((conversation) => {
                    if (conversation.includes(user._id)) found = true;
                })
                return !found;
            })
            socket.emit('users', { users: users });
        } else {
            socket.emit('users', { users: [] });
        }
    })

    socket.on('conversationmessages', async (data) => {
        const { cookies, conversation_id } = data;
        if (await checkToken(cookies)) {
            let messages = await Message.find({ conversation_id });
            socket.emit('conversationmessages', { messages: messages });
        } else {
            socket.emit('conversationmessages', { messages: [] });
        }
    })

    socket.on('newmessage', async (data) => {
        const { cookies, conversation_id, content } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            let message = new Message({ sender_id, conversation_id, date: new Date().toISOString(), content });
            await message.save();
            socket.emit('newmessage', { sent: true });
        } else {
            socket.emit('newmessage', { sent: false });

        }
    })
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});

module.exports = server;