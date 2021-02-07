var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

router.get('/productCart', mainController.productCart);
router.get('/productDetail', mainController.productDetail);
router.get('/register', mainController.register);



module.exports = router;
