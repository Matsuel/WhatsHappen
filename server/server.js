const express = require('express');
const app = express();
const cors  = require('cors');
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})
app.use(express.json({limit:'10mb'}));

const db = new sqlite3.Database('../src/database/WhatsApp.db', (err)=>{
    if(err){
        console.log(err.message);
    }
    console.log('Connected to the database');
})

app.post('/login', (req,res)=>{
    const {email, password} = req.body;

    console.log(email);

    db.all(`SELECT * FROM Users WHERE username= '${email}' OR mail= '${email}' AND password = '${password}'`, (err,rows)=>{
        if (err){
            console.log(err.message);
        }
        if(rows.length>0){
            res.send({validation:true})
        }else{
            res.send({validation:false})
        }
    })
})

app.post('/register', (req,res)=>{
    const {pseudo,email, hashedPassword} = req.body;

    db.run(`INSERT INTO Users(username,mail,password) VALUES('${pseudo}','${hashedMail}','${hashedPassword}')`, (err)=>{
        if(err){
            console.log(err.message);
        }
        res.send({created:true});
    })
})

app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})