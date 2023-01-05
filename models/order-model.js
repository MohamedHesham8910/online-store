const db = require("../data/database");

class Order{
    constructor(cart, userData, status = 'Pending', date, orderId){
        this.cart = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date).toLocaleString('en-US', {
            weekday: "long",
            day: "numeric",
            month: "numeric",
            year: "numeric"
        });
        this.id = orderId;
    }

    async save(){
        const cartItems= this.cart.items.map(item => {
            delete item.product.description;
            delete item.product.image;
            delete item.product.imagePath;
            delete item.product.imageUrl;
            return item;
        });
        await db.getDB().collection('orders').insertOne({
            items: cartItems,
            totalOrderPrice: this.cart.totalPrice,
            userData: this.userData,
            status: this.status,
            date: this.date,
            id: this.id
        })
    }

    static async getCustomerOrders(email){
        const orders = await db.getDB().collection('orders').find({'userData.email': email}).toArray();
        return orders;
    }

    static async getAllOrders(){
        const orders = await db.getDB().collection('orders').find().toArray();
        return orders;
    }

    static async updateOrder(id,status){
        await db.getDB().collection('orders').updateOne({id: id}, {$set:{status: status}});
    }
}

module.exports = Order;