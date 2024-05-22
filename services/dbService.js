const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let db;

//connecting to gikki-db database
const connectToDb = async () => {
    try {
        if (db) return db;
        
        const client = await MongoClient.connect(process.env.MONGO_URI);
        db = client.db();
        
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

const getDb = () => {
    if (!db) throw new Error('Database not connected');
    return db;
};


module.exports = { connectToDb, getDb };
