const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../services/userService');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await createUser({ username, email, password: hashedPassword, role });
        console.log(user);
        res.status(201).send({ message: 'User created', user });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};
