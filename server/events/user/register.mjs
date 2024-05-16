import { color } from "../../Functions/colors.mjs";
import { User } from "../../Models/User.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretTest = process.env.SECRET;

export const register = (socket) => {
    return async (data) => {
        try {
            const { pseudo, email, password, selectedFile } = data;
            const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
            if (user) {
                socket.emit('register', { created: false });
            } else {
                let filedata = "";
                if (selectedFile) {
                    filedata = selectedFile.toString('base64')
                    console.log(filedata)
                }
                const newUser = new User({ pic: filedata, username: pseudo, mail: email, password: bcrypt.hashSync(password, 10) });
                await newUser.save();
                const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
                const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '720h' });
                socket.emit('register', { created: true, token });
            }
        } catch (error) {
            console.log(color('error', error));
        }
    }
}