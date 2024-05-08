import jwt from 'jsonwebtoken';
import { User } from '../Models/User.mjs';
import { Conversation } from '../Models/Conversation.mjs';
import checkToken from '../Functions/CheckToken.mjs';
const secretTest = "84554852585915452156252015015201520152152252"


// Fonction qui récupère les utilisateurs disponibles pour une nouvelle conversation
function getUsers(socket) {
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
}

export { getUsers }