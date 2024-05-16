import { color } from "../../Functions/colors.mjs";

export const join = (socket, connectedUsers) => {
    return async (data) => {
        try {
            if (!connectedUsers[data.userId]) {
                connectedUsers[data.userId] = socket;
                console.log(color('success', `Connected Users : ${data.userId}`));
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}