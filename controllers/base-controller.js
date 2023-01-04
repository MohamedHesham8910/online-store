const { ObjectId } = require("mongodb");
const db = require("../data/database");

async function getProducts(req,res){
    const products = await db.getDB().collection("products").find().toArray();
    res.render('customer/products/all-products', { products: products });
}

async function getProduct(req,res){
    const product = await db.getDB().collection("products").findOne({_id: ObjectId(req.params.id)});
    res.render('customer/products/product', {product: product});
}

function get401(req,res){
    res.render('shared/401');
}

function get403(req,res){
    res.render('shared/403');
}

module.exports = {
    getProducts:getProducts,
    get401: get401,
    get403: get403,
    getProduct: getProduct
}