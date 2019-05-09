var express = require('express');
var router = express.Router();
var controller = require('../controllers/cart.controller');

router.get('/', controller.showAllCart)
router.get('/add/:productid', controller.addToCart);

module.exports = router;