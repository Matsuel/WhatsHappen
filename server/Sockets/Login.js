const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const secretTest="84554852585915452156252015015201520152152252"

function login(socket){
    socket.on('login', async (data) => {
        const { email, password } = data;
        const user = await User.findOne({ $or: [{ username: email }, { mail: email }] });
        if ((user) && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '48h' });
            socket.emit('login', { validation: true, token });
        } else {
            socket.emit('login', { validation: false });
        }
    });
}

module.exports = Login;