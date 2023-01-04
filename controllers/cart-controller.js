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

module.exports = {
  addItem: addItem,
};
