import { User } from "../../Models/User.mjs";
import checkToken from "../../Functions/CheckToken.mjs";
import { color } from "../../Functions/colors.mjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const secretTest = process.env.SECRET

export const userInfos = (socket) => {
    return async (data) => {
        try {
            const { cookies } = data;
            if (await checkToken(cookies)) {
                const userId = jwt.verify(cookies, secretTest).userId;
                const user = await User.findById(userId).select('username pic');
                socket.emit('userinfos', { user });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}