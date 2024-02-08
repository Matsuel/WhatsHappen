import jwt from 'jsonwebtoken';
import {User} from '../Models/User.mjs';
import {Conversation} from '../Models/Conversation.mjs';
import checkToken from '../Functions/CheckToken.mjs';
const secretTest = "84554852585915452156252015015201520152152252"

function getUsers (socket) {
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
}

export { getUsers }