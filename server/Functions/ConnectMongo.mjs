import mongoose from 'mongoose';
import { color } from './colors.mjs';

function connectMongo() {
    try {
        mongoose.connect('mongodb://localhost:27017/Whatsapp')
        .then(() => console.log(color('infos', 'MongoDB connected successfully! 💡')))
        .catch((err) => console.log(color('error', err)));
    } catch (err) {
        console.log(err);
    }
}

export {connectMongo};