import checkToken from "../../Functions/CheckToken.mjs"
import { color } from "../../Functions/colors.mjs"
import { Conversation } from "../../Models/Conversation.mjs"
import { User } from "../../Models/User.mjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secretTest = process.env.SECRET

export const search = (socket) => {
    return async (data) => {
        try {
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
        } catch (error) {
            console.log(color('error', error));
        }
    }
}