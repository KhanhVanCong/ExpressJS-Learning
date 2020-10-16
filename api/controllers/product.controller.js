var Product = require('../../models/product.model');

module.exports.apiAllProducts  = async (req, res) => {
    var productsAll = await Product.find();
    res.json(productsAll)
};

module.exports.create = async (req, res) => {
    var product = await Product.create(req.body);
    res.json(product);
};