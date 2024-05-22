const { ObjectId } = require('mongodb');
const { getDb } = require('./dbService');

const createUser = async (user) => {
    const db = await getDb();
    const result = await db.collection('users').insertOne(user);
    // console.log(result);
    return result
};

const getUserByEmail = async (email) => {
    const db = await getDb();
    return db.collection('users').findOne({ email });
};

const getUserById = async (id) => {
    const db = await getDb();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
};

module.exports = { createUser, getUserByEmail, getUserById };
