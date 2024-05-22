const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication routes
router.post('/auth/register/', authController.register);
router.post('/auth/login/', authController.login);

// Product routes
router.post('/products/', authMiddleware, roleMiddleware(['admin']), productController.createProduct);
router.get('/products/', authMiddleware, roleMiddleware(['admin', 'manager']), productController.getProducts);
router.put('/products/:id', authMiddleware, roleMiddleware(['admin', 'manager']), productController.updateProduct);
router.delete('/products/:id', authMiddleware, roleMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
