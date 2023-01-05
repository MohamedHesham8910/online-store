const express = require('express');

const cartController = require('../controllers/cart-controller');

const router = express.Router();

router.post('/items',cartController.addItem);

router.get('',cartController.getCart);

router.patch('/items',cartController.updateCart)

module.exports = router;