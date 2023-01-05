class Cart{
    constructor(items =[], totalQuantity = 0 , totalPrice = 0){
        this.items = items;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
    }

    addItem(product){
        const cartItem = {
            product: product,
            id: product._id.toString(),
            quantity: 1,
            totalPrice: product.price
        }
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if(item.id == product._id.toString()){
                cartItem.quantity = +item.quantity + 1;
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

    updateItem(productId, newQuantity){
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if(item.id == productId && newQuantity >0){
                const cartItem = {...item};
                const quantityChange = newQuantity - cartItem.quantity;
                cartItem.quantity = newQuantity;
                cartItem.totalPrice = newQuantity * cartItem.product.price;
                this.items[i] = cartItem;
                this.totalQuantity += quantityChange;
                this.totalPrice += quantityChange * cartItem.product.price;
                return (cartItem.totalPrice);
            }
            else if(item.id == productId && newQuantity <= 0){
                this.items.splice(i,1);
                this.totalQuantity -= item.quantity;
                this.totalPrice -= item.totalPrice;
                return 0
            }
        }
    }
}

module.exports = Cart;