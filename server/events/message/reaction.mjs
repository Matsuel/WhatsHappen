import mongoose from "mongoose";
import checkToken from "../../Functions/CheckToken.mjs";
import { color } from "../../Functions/colors.mjs";
import jwt from 'jsonwebtoken';
import { otherSynchroMessage } from "../../Functions/Message.mjs";
import dotenv from 'dotenv';

dotenv.config()
const secretTest = process.env.SECRET


export const reaction = (socket, connectedUsers) => {
    return async (data) => {
        try {
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
                otherSynchroMessage(cookies, conversationActive, connectedUsers);
            }
            socket.emit('reaction', { reacted: false });
        } catch (error) {
            console.log(color('error', error));
        }
    }
}