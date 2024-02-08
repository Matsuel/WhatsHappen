const mongoose = require('mongoose');

function connectMongo() {
    mongoose.connect('mongodb://localhost:27017/Whatsapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log(err));
}

module.exports = connectMongo;