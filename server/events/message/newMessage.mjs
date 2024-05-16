import checkToken from "../../Functions/CheckToken.mjs";
import jwt from 'jsonwebtoken';
import { otherSynchroMessage, saveMessage } from "../../Functions/Message.mjs";
import { color } from "../../Functions/colors.mjs";
import dotenv from 'dotenv';

dotenv.config();
const secretTest = process.env.SECRET;


export const newMessage = (socket, connectedUsers) => {
    return async (data) => {
        try {
            const { cookies, conversation_id, content } = data;
            if (await checkToken(cookies)) {
                const sender_id = jwt.verify(cookies, secretTest).userId;
                content !== "" ? await saveMessage(conversation_id, content, sender_id) : null;
                socket.emit('newmessage', { sent: true });
                otherSynchroMessage(cookies, conversation_id, connectedUsers);
            } else {
                socket.emit('newmessage', { sent: false });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}