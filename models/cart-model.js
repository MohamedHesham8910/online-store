class Cart{
    constructor(items =[], totalQuantity = 0 , totalPrice = 0){
        this.items = items;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
    }

    addItem(product){
        const cartItem = {
            product: product,
            id: product.id,
            quantity: 1,
            totalPrice: product.price
        }
        for (let i = 0; i < this.items; index++) {
            const item = this.items[i];
            if(item.id == product.id){
                cartItem.quantity = item.quantity + 1;
                cartItem.totalPrice = item.totalPrice + product.price;
                this.items[i] = cartItem;
                this.totalQuantity++;
                this.totalPrice += product.price;
                return;
            }  
        }
        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice += product.price;
    }
}

module.exports = Cart;