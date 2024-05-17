import { login } from "./user/login.mjs";
import { register } from "./user/register.mjs";
import { deleteMessage } from "./message/deleteMessage.mjs";
import { newMessage } from "./message/newMessage.mjs";
import { conversations } from "./conversation/conversations.mjs";
import { newConversation } from "./conversation/newConversation.mjs";
import { messages } from "./conversation/messages.mjs";
import { pinconversation } from "./conversation/pinconversation.mjs";
import { search } from "./user/search.mjs";
import { otherinfos } from "./user/otherInfos.mjs";
import { reaction } from "./message/reaction.mjs";
import { typing } from "./user/typing.mjs";
import { disconnect } from "./user/disconnect.mjs";
import { join } from "./user/join.mjs";
import { synchroStatut } from "./user/synchrostatut.mjs";
import { userInfos } from "./user/userInfos.mjs";

import { color } from "../Functions/colors.mjs";

let connectedUsers = {};
let typingTimeouts = {};

export const startEvents = (io) => {
    io.on('connection', (socket) => {
        socket.on('login', login(socket));
        socket.on('register', register(socket));
        socket.on('deletemessage', deleteMessage(socket, connectedUsers));
        socket.on('newmessage', newMessage(socket, connectedUsers));
        socket.on('conversations', conversations(socket, connectedUsers));
        socket.on('newconversation', newConversation(socket));
        socket.on('conversationmessages', messages(socket));
        socket.on('pinconversation', pinconversation(socket));
        socket.on('searchusers', search(socket));
        socket.on('otherinfos', otherinfos(socket));
        socket.on('reaction', reaction(socket, connectedUsers));
        socket.on('typing', typing(socket, connectedUsers, typingTimeouts));
        socket.on('disconnect', disconnect(socket, connectedUsers));
        socket.on('synchro', join(socket, connectedUsers));
        socket.on('synchrostatus', synchroStatut(socket, connectedUsers));
        socket.on('userinfos', userInfos(socket));
    });
}

export const startListeners = (server) => {
    server.listen(3001, () => {
        console.log(color('success','Server is running on port 3001 👂'));
    });
}