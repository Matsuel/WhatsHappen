import jwt from 'jsonwebtoken';
import {User} from '../Models/User.mjs';
const secretTest = "84554852585915452156252015015201520152152252"

const checkToken = async (cookies) => {
    const decoded = jwt.verify(cookies, secretTest);
    const user = await User.findOne({ $or: [{ username: decoded.pseudo }, { mail: decoded.mail }] });
    return user ? true : false;
}

export default checkToken;