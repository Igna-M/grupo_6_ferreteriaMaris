var express = require('express');
var router = express.Router();

var path = require('path');
const validationCreate = require('../middlewares/createProductValidation');
const validationEdit = require('../middlewares/editProductValidation');
const productsController = require('../controllers/productsController');
const uploadFile = require('../middlewares/productsMulter')

const productsDBController = require('../controllers/productsDBController');



router.get('/', productsController.productsList);

router.get('/create', productsController.createProduct);

router.post('/create', uploadFile.single('product_img'), validationCreate, productsController.create);

router.get('/edit/:id', productsController.edit);

router.post('/delete', productsController.delete);

router.post('/update/:id', uploadFile.single('product_img'), validationEdit, productsController.update);



router.get('/db', productsDBController.productsList);

router.get('/db/create', productsDBController.createProduct);

router.post('/db/create', uploadFile.single('product_img'), validationCreate, productsDBController.create);

router.post('/db/delete', productsDBController.delete);

router.get('/db/edit/:id', productsDBController.edit);

router.post('/db/update/:id', uploadFile.single('product_img'), validationEdit, productsDBController.update);


module.exports = router;
