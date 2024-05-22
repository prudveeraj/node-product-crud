const { ObjectId } = require('mongodb');
const { getDb } = require('./dbService');

const createProduct = async (product) => {
    const db = await getDb();
    const result = await db.collection('products').insertOne(product);
    return result;
};

const getProducts = async () => {
    const db = await getDb();
    return db.collection('products').find().toArray();
};

const updateProduct = async (id, product) => {
    const db = await getDb();
    const result = await db.collection('products').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: product },
        { returnOriginal: false }
    );
    return result;
};

const deleteProduct = async (id) => {
    const db = await getDb();
    const result = await db.collection('products').findOneAndDelete({ _id:new ObjectId(id) });
    return result;
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
