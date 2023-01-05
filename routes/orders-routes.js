const express = require('express');

const ordersController = require('../controllers/orders-controller');

const router = express.Router();

router.post('/',ordersController.addOrder);

router.get('',ordersController.getOrders);

router.patch('/update',ordersController.updateOrders);

module.exports = router;