const { ObjectId } = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
  }

  async addProduct() {
    await db.getDB().collection("products").insertOne({
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image,
      imagePath: this.imagePath,
      imageUrl: this.imageUrl,
    });
  }

  async updateProduct(id) {
    const productId = new ObjectId(id);
    await db
      .getDB()
      .collection("products")
      .updateOne(
        { _id: productId },
        {
          $set: {
            title: this.title,
            price: this.price,
            description: this.description,
            image: this.image,
            imagePath: this.imagePath,
            imageUrl: this.imageUrl,
          },
        }
      );
  }

  static async checkImage(id) {
    const productId = new ObjectId(id);
    const product = await db.getDB().collection("products").findOne({ _id: productId });
    return product;
  }
}

module.exports = Product;
