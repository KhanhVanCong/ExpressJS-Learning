var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');


router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send('Hello')
})
router.get('/search', controller.search);

router.get('/create', controller.create)

router.get('/:id', controller.getID);

router.post('/create', validate.postCreate, controller.postCreate)
module.exports = router;