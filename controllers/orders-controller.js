const Order = require("../models/order-model");
const db = require("../data/database");
const crypto = require('crypto').webcrypto;

async function addOrder(req,res){
    const cart = res.locals.cart;
    const user = await db.getDB().collection('users').findOne({email: res.locals.email});
    const userData = {
        name: user.name,
        email: user.email,
        address: user.address
    }
    const date = new Date();
    const orderId = crypto.randomUUID();
    const order = new Order(cart,userData,'Pending',date,orderId);
    await order.save();
    req.session.cart = null;
    res.redirect('/orders');
}

async function getOrders(req,res){
    const orders = await Order.getCustomerOrders(req.session.email); 
    res.render('customer/orders',{orders: orders});
}

async function updateOrders(req,res){
    await Order.updateOrder(req.body.id,req.body.status);
    res.json({
        message: 'Order Updated'
    });
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
    updateOrders: updateOrders
}