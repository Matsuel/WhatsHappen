import checkToken from "../../Functions/CheckToken.mjs";
import { Conversation } from "../../Models/Conversation.mjs";
import { User } from "../../Models/User.mjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { color } from "../../Functions/colors.mjs";

dotenv.config()
const secretTest = process.env.SECRET

export const otherinfos = (socket) => {
    return async (data) => {
        try {
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
        } catch (error) {
            console.log(color('error', error));
        }
    }
}