const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const secretTest = "84554852585915452156252015015201520152152252"

function register(socket) {
    socket.on('register', async (data) => {
        const { pseudo, email, password } = data;
        const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
        if (user) {
            socket.emit('register', { created: false });
        } else {
            const newUser = new User({ username: pseudo, mail: email, password: bcrypt.hashSync(password, 10) });
            await newUser.save();
            const user = await User.findOne({ $or: [{ username: pseudo }, { mail: email }] });
            const token = jwt.sign({ userId: user._id, mail: user.mail, pseudo: user.username }, secretTest, { expiresIn: '1h' });
            socket.emit('register', { created: true, token });
        }
    });
}

module.exports = Register;