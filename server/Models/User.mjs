import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    pic:String,
    username: String,
    mail: String,
    password: String,
}));

export {User};