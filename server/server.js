const express = require('express');
const app = express();
const cors  = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})
app.use(express.json({limit:'10mb'}));

mongoose.connect('mongodb://localhost:27017/Whatsapp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('Connected to the database'))
.catch((err)=>console.log(err));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    mail: String,
    password: String,
    uuids: Array,
}));

const Conversation= mongoose.model('Conversation', new mongoose.Schema({
    users_id: Array,
}));

const Message = mongoose.model('Message', new mongoose.Schema({
    sender_id: String,
    conversation_id: String,
    time: String,
    content: String,
}));

const secretTest ="84554852585915452156252015015201520152152252"

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    
    const user = await User.findOne({$or: [{username: email}, {mail: email}]});
    if((user) && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '1h' });
        res.send({validation:true, token})
    }else{
        res.send({validation:false})
    }
})

app.post('/register', async (req,res)=>{
    const {pseudo,email, password} = req.body;

    const user = await User.findOne({$or: [{username: pseudo}, {mail: email}]});
    if(user){
        res.send({created:false})
    }else{
        const newUser = new User({username: pseudo, mail: email, password: bcrypt.hashSync(password, 10)});
        await newUser.save();
        const user = await User.findOne({$or: [{username: pseudo}, {mail: email}]});
        const token = jwt.sign({ userId: user._id,mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '1h' });
        res.send({created:true, token})
    }
})

app.post('/users', async (req,res)=>{
    const {cookies} = req.body;
    if(await checkToken(cookies)){
        let users = await User.find();
        const decoded = jwt.verify(cookies, secretTest);
        users = users.filter((user)=>user.username!==decoded.pseudo);
        let conversations = await Conversation.find({users_id: decoded.userId});
        conversations = conversations.map((conversation)=>conversation.users_id);
        users = users.filter((user)=>{
            let found = false;
            conversations.forEach((conversation)=>{
                if(conversation.includes(user._id)) found = true;
            })
            return !found;
        })
        res.send({users: users});
    }else{
        res.send({users: []});
    }

})

app.post('/createConversation', async (req,res)=>{
    const {cookies, user} = req.body;
    if(await checkToken(cookies)){
        let creatorId = jwt.verify(cookies, secretTest).userId;
        if (await Conversation.findOne({users_id: [creatorId, user._id]})) return res.send({created: false});
        if (await Conversation.findOne({users_id: [user._id, creatorId]})) return res.send({created: false});
        let conversation = new Conversation({users_id: [creatorId, user._id]});
        await conversation.save();
        res.send({created: true});
    }else{
        res.send({created: false});
    }
})

const checkToken = async (cookies) => {
    const decoded = jwt.verify(cookies, secretTest);
    const user = await User.findOne({$or: [{username: decoded.pseudo}, {mail: decoded.mail}]});
    return user?true:false;
}

const getUuidOfUser = async (userId) => {
    const user = await User.findById(userId);
    return user.uuids;
}

const correctUuid = async (uuid)=>{
    let uuids = getUuidOfUser(uuid);
    return uuids.includes(uuid);
}

app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})