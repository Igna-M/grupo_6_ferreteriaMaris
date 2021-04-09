var express = require('express');
var router = express.Router();

var path = require('path');
const validation = require('../middlewares/createProductValidation');
const productsController = require('../controllers/productsController');
const uploadFile = require('../middlewares/productsMulter')


router.get('/', productsController.productsList);

router.get('/create', productsController.createProduct);

router.post('/create', uploadFile.single('product_img'), validation, productsController.create);

router.get('/edit/:id', productsController.edit);

router.post('/delete', productsController.delete);

router.post('/update', productsController.update);




module.exports = router;
