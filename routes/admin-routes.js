const express = require('express');
const imageUploadMiddleware = require('../middlewares/image-upload');

const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/products',adminController.getProducts);

router.get('/orders',adminController.getOrders);

router.get('/new-product',adminController.getNewProduct);

router.post('/new-product',imageUploadMiddleware,adminController.addNewProduct);

router.get('/products/update/:id', adminController.getUpdateProduct);

router.post('/products/update/:id',imageUploadMiddleware, adminController.updateProduct);

router.delete('/products/delete/:id', adminController.deleteProduct);

module.exports = router;