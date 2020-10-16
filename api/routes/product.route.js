var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');


router.get('/', controller.apiAllProducts);
router.post('/', controller.create);

module.exports = router