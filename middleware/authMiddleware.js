const jwt = require('jsonwebtoken');
const { getUserById } = require('../services/userService');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(400).send({ message: 'Token not provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await getUserById(decoded.id);
        console.log(JSON.stringify(req.user));
        if (!req.user) return res.status(401).send({ message: 'Invalid token' });
        next();
    } catch (err) {
        console.error("iii",err);
        res.status(401).send({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
