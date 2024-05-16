import { color } from "../../Functions/colors.mjs";

export const disconnect = (socket, connectedUsers) => {
    return async () => {
        try {
            for (let [key, value] of Object.entries(connectedUsers)) {
                if (value === socket) {
                    delete connectedUsers[key];
                    console.log(color('error', `Disconnected Users : ${key}`));
                }
            }            
        } catch (error) {
            console.log(color('error', error));            
        }
    }
}