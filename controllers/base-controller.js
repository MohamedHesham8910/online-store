function getProducts(req,res){
    res.render('customer/products/all-products');
}

module.exports = {
    getProducts:getProducts
}