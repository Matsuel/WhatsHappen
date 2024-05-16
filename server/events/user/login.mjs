import { color } from "../../Functions/colors.mjs";
import { User } from "../../Models/User.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretTest = process.env.SECRET;


export const login = (socket) => {
    return async (data) => {
        try {
            const { email, password } = data;
            const user = await User.findOne({ $or: [{ username: email }, { mail: email }] });
            if ((user) && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '720h' });
                socket.emit('login', { validation: true, token });
            } else {
                socket.emit('login', { validation: false });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}