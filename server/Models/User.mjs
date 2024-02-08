import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    mail: String,
    password: String,
}));

export {User};