const { ObjectId } = require("mongodb");
const db = require("../data/database");
const Product = require("../models/product-model");
const Order = require("../models/order-model");

async function getProducts(req, res) {
  const products = await db.getDB().collection("products").find().toArray();
  res.render("admin/products", { products: products });
}

async function getOrders(req, res) {
  const orders = await Order.getAllOrders();
  res.render("admin/orders",{orders: orders});
}

function getNewProduct(req, res) {
  res.render("admin/new-product");
}

async function addNewProduct(req, res) {
  const product = new Product({ ...req.body, image: req.file.filename });
  await product.addProduct();
  res.redirect("/admin/products");
}

async function getUpdateProduct(req, res) {
  const product = await db
    .getDB()
    .collection("products")
    .findOne({ _id: ObjectId(req.params.id) });
  res.render("admin/update-product", { product: product });
}

async function deleteProduct(req, res) {
  await db
    .getDB()
    .collection("products")
    .deleteOne({ _id: ObjectId(req.params.id) });
  res.json({ message: "Product Deleted" });
}

async function updateProduct(req, res) {
  const productOriginal = await Product.checkImage(req.params.id);
  let imageName;
  if(!req.file){
    imageName = productOriginal.image;
  }
  else{
    imageName = req.file.filename;
  }
  const product = new Product({ ...req.body, image: imageName });
  await product.updateProduct(req.params.id);
  res.redirect('/admin/products');
}

module.exports = {
  getProducts: getProducts,
  getOrders: getOrders,
  getNewProduct: getNewProduct,
  addNewProduct: addNewProduct,
  getUpdateProduct: getUpdateProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
};
