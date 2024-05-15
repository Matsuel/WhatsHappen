import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { MessageSchema } from './Models/Message.mjs';
import { connectMongo } from './Functions/ConnectMongo.mjs';
import { Conversation } from './Models/Conversation.mjs';
import jwt from 'jsonwebtoken';
import checkToken from './Functions/CheckToken.mjs';
import mongoose from 'mongoose';
import { User } from './Models/User.mjs';
import bcrypt from 'bcrypt';
const secretTest = "84554852585915452156252015015201520152152252"


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

    //canal permettant de sauvagarder les utilisateurs connectés
    socket.on('synchro', (data) => {
        if (!connectedUsers[data.userId]) {
            connectedUsers[data.userId] = socket;
            console.log(Object.keys(connectedUsers));
        }
    })

    //canal permettant de supprimer un utilisateur de la liste des connectés
    socket.on('disconnect', () => {
        for (let [key, value] of Object.entries(connectedUsers)) {
            if (value === socket) {
                delete connectedUsers[key];
            }
        }
    })

    //staut quand l'utilisateur est en train d'écrire
    socket.on('typing', async (data) => {
        const { cookies, conversation_id } = data;
        if (await checkToken(cookies)) {
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

    //envoie d'un message et synchro avec l'autre utilisateur si il est connecté
    socket.on('newmessage', async (data) => {
        console.log(data);
        const { cookies, conversation_id, content } = data;
        console.log(content);
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            content !== "" ? await saveMessage(conversation_id, content, sender_id) : null;
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

    async function otherSynchroMessage(cookies, conversation_id) {
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

    async function getLastMessage(conversation_id) {
        let MessageModel = mongoose.model('Messages' + conversation_id);
        let lastMessage = await MessageModel.findOne().sort({ date: -1 });
        return lastMessage;
    }

    //permet de savoir si l'utilisateur est connecté
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

    //permet de supprimer un message
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

    //permet de réagir à un message
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
                    } else {
                        message.reactions[reactionIndex].reaction = reaction_id;
                    }
                }
            } else {
                message.reactions = [{ user_id: sender_id, reaction: reaction_id }];
            }
            await message.save();
            socket.emit('reaction', { reacted: true });
            otherSynchroMessage(cookies, conversationActive);
        }
        socket.emit('reaction', { reacted: false });
    })

    socket.on('otherinfos', async (data) => {
        const { cookies, conversation_id } = data;
        if (await checkToken(cookies)) {
            const sender_id = jwt.verify(cookies, secretTest).userId;
            const conversation = await Conversation.findById(conversation_id);
            const otherId = conversation.users_id.filter((id) => id !== sender_id)[0];
            const user = await User.findById(otherId);
            socket.emit('otherinfos', { name: user.username, pic: user.pic });
        } else {
            socket.emit('otherinfos', { name: null, pic: null, id: null });
        }
    })

    socket.on('login', async (data) => {
        const { email, password } = data;
        const user = await User.findOne({ $or: [{ username: email }, { mail: email }] });
        if ((user) && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '720h' });
            socket.emit('login', { validation: true, token });
        } else {
            socket.emit('login', { validation: false });
        }
    });

    socket.on('register', async (data) => {
        const { pseudo, email, password, selectedFile } = data;
        const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
        if (user) {
            socket.emit('register', { created: false });
        } else {
            let filedata = "";
            if (selectedFile) {
                filedata = selectedFile.toString('base64')
                console.log(filedata)
            }
            const newUser = new User({ pic: filedata, username: pseudo, mail: email, password: bcrypt.hashSync(password, 10) });
            await newUser.save();
            const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
            const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '720h' });
            socket.emit('register', { created: true, token });
        }
    });

    socket.on('conversations', async (data) => {
        const { cookies } = data
        if (await checkToken(cookies)) {
            let userId = jwt.verify(cookies, secretTest).userId;
            let conversations = await Conversation.find({ users_id: userId }).sort({ last_message_date: -1 });
            conversations = await getConversationsInfos(conversations, userId);
            conversations = sortConversations(conversations, userId);
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
            let conv = mongoose.model('Messages' + conversation._id, MessageSchema);
            conv.createCollection();
            socket.emit('newconversation', { created: true });
        } else {
            socket.emit('newconversation', { created: false });
        }
    })

    socket.on('conversationmessages', async (data) => {
        const { cookies, conversation_id } = data;
        if (await checkToken(cookies)) {
            const MessageModel = mongoose.model('Messages' + conversation_id, MessageSchema);
            let messages = await MessageModel.find();
            socket.emit('conversationmessages', { messages: messages });
        } else {
            socket.emit('conversationmessages', { messages: [] });
        }
    })

    socket.on('pinconversation', async (data) => {
        const { cookies, conversation_id } = data;
        if (await checkToken(cookies)) {
            let conversation = await Conversation.findById(conversation_id);
            let userId = jwt.verify(cookies, secretTest).userId;
            if (conversation.pinnedBy.includes(userId)) {
                conversation.pinnedBy = conversation.pinnedBy.filter((id) => id !== userId);
            } else {
                conversation.pinnedBy.push(userId);
            }
            await conversation.save();
            socket.emit('pinconversation', { pinned: true });
        }
    })

    socket.on('searchusers', async (data) => {
        const { token, search } = data
        const user = await checkToken(token)
        if (user) {
            const user_id = jwt.decode(token, secretTest).userId
            let users = await User.find({ _id: { $ne: user_id }, username: { $regex: search, $options: 'i' } })
            let conversations = await Conversation.find({ users_id: { $all: [user_id] } })
            conversations = conversations.map(conversation => conversation.users_id)
            users = users.filter((user) => {
                let found = false
                conversations.forEach(conversation => {
                    if (conversation.includes(user._id)) {
                        found = true
                    }
                })
                return !found
            })
            socket.emit('searchusers', { users: users })
        } else {
            socket.emit('searchusers', { users: null })
        }
    })
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});

export { server, connectedUsers }


// Fonction qui récupère les informations des conversations
async function getConversationsInfos(conversations, userId) {
    conversations = await Promise.all(conversations.map(async (conversation) => {
        let otherUserId = conversation.users_id.filter((id) => id !== userId)[0];
        let otherUser = await User.findById(otherUserId);
        let status = connectedUsers[otherUserId] ? true : false;
        return { ...conversation.toObject(), name: otherUser.username, pic: otherUser.pic, status };
    }))
    return conversations;
}


function sortConversations(conversations, userId) {
    conversations = conversations.sort((a, b) => {
        // si a est épinglé et pas b
        if (a.pinnedBy.includes(userId) && !b.pinnedBy.includes(userId)) return -1;
        // si b est épinglé et pas a
        if (!a.pinnedBy.includes(userId) && b.pinnedBy.includes(userId)) return 1;
        // si a est plus récent que b
        if (a.last_message_date > b.last_message_date) return -1;
        // si b est plus récent que a
        if (a.last_message_date < b.last_message_date) return 1;
        return 0;
    })
    return conversations;
}