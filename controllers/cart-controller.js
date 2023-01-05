const { ObjectId } = require("mongodb");
const db = require("../data/database");

async function addItem(req, res,next) {
  let product;
  try {
    product = await db
      .getDB()
      .collection("products")
      .findOne({ _id: ObjectId(req.body.productId) });
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!",
    totalQuantity: cart.totalQuantity,
  });
}

function getCart(req,res){
  const cart = res.locals.cart;
  res.render('customer/cart/cart', {cartItems: cart.items, cartPrice: cart.totalPrice});
}

function updateCart(req,res){
  const cart = res.locals.cart;
  const updatedPrice = cart.updateItem(req.body.id, req.body.quantity);
  req.session.cart = cart;
  
  res.json({
    message: 'Item Updated',
    totalPrice: cart.totalPrice,
    totalQuantity: cart.totalQuantity,
    updatedItemPrice: updatedPrice
  });
}

module.exports = {
  addItem: addItem,
  getCart: getCart,
  updateCart: updateCart
};
