const { createProduct, getProducts, updateProduct, deleteProduct } = require('../services/productService');

exports.createProduct = async (req, res) => {
    const { title, description, inventoryCount } = req.body;
    try {
        const product = await createProduct({ title, description, inventoryCount });
        res.status(201).send({ message: 'Product created', product });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).send(products);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, inventoryCount } = req.body;
    try {
        const product = await updateProduct(id, { title, description, inventoryCount });
        if (!product) return res.status(404).send({ message: 'Product not found' });
        res.status(200).send({ message: 'Product updated', product });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await deleteProduct(id);
        if (!product) return res.status(404).send({ message: 'Product not found' });
        res.status(200).send({ message: 'Product deleted' });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};
