const { ObjectId } = require('mongodb');
const { getDb } = require('./dbService');

const createUser = async (user) => {
    const db = await getDb();
    const email = user.email
    const user_exists = await db.collection('users').findOne({ email });
    if(!user_exists) {
        const result = await db.collection('users').insertOne(user);
        return {"message": "User created successfully", "data": result}
    } else {
        return {"message": "User already exists"}
    }
    // console.log(result);
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
