import { color } from "../../Functions/colors.mjs";
import { Conversation } from "../../Models/Conversation.mjs";


export const synchroStatut = (socket, connectedUsers) => {
    return async (data) => {
        try {
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
        } catch (error) {
            console.log(color('error', error));
        }
    }
}