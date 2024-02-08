const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const secretTest = "84554852585915452156252015015201520152152252"

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

mongoose.connect('mongodb://localhost:27017/Whatsapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log(err));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    mail: String,
    password: String,
}));

const Conversation = mongoose.model('Conversation', new mongoose.Schema({
    users_id: Array,
    type: String,
}));

const Message = mongoose.model('Message', new mongoose.Schema({
    sender_id: String,
    conversation_id: String,
    date: String,
    content: String,
}));

const connectedUsers = [];

io.on('connection', (socket) => {

    connectedUsers.push(socket);

    socket.on('disconnect', () => {
        const index = connectedUsers.indexOf(socket);
        if (index !== -1) {
            connectedUsers.splice(index, 1);
        }
    });

    socket.on('login', async (data) => {
        const { email, password } = data;
        const user = await User.findOne({ $or: [{ username: email }, { mail: email }] });
        if ((user) && (await bcrypt.compare(password, user.password))) {
            console.log('Connexion réussie');
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
            console.log(conversations);
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
        }else{
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
        }else{
            socket.emit('newmessage', { sent: false });
        
        }
    })
});


    const checkToken = async (cookies) => {
        const decoded = jwt.verify(cookies, secretTest);
        const user = await User.findOne({ $or: [{ username: decoded.pseudo }, { mail: decoded.mail }] });
        return user ? true : false;
    }

    server.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
