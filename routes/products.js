var express = require('express');
const multer  = require('multer');
var path = require('path');

var router = express.Router();

const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //   cb(null, '${Date.now()}_img_${path.extname(file.originalname)}')
    }
});
   
const uploadFile = multer({ storage: storage })



router.get('/', productsController.products);

router.post('/create', uploadFile.single('product_img'), productsController.create);




module.exports = router;
