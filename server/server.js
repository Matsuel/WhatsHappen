const express = require('express');
const app = express();
const cors  = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    password: String
}));

const secretTest ="84554852585915452156252015015201520152152252"

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;

    console.log(email);

    const user = await User.findOne({$or: [{username: email}, {mail: email}]});
    if((user) && (await bcrypt.compare(password, user.password))){
        console.log(user);
        const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '1h' });
        res.send({validation:true, token})
    }else{
        console.log(user);
        res.send({validation:false})
    }
})

app.post('/register', async (req,res)=>{
    const {pseudo,email, hashedPassword} = req.body;

    const user = await User.findOne({$or: [{username: pseudo}, {mail: email}]});
    if(user){
        res.send({created:false})
    }else{
        const newUser = new User({username: pseudo, mail: email, password: hashedPassword});
        await newUser.save();
        const token = jwt.sign({ userId: user._id,mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '1h' });
        res.send({created:true, token})
    }
})

app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})