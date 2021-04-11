var express = require('express');
var router = express.Router();

// var path = require('path');

const usersController = require('../controllers/usersController');
const uploadAvatar = require("../middlewares/usersMulter")


// const usersBaseController = require("../controllers/userBaseController")
// const validations = require('../middleware/validateRegister');
// 
// const guestsMiddleware = require('../middleware/guestMiddleware');
// const authMiddleware = require('../middleware/authMiddleware');



router.get('/', usersController.users);

router.get('/create', usersController.createForm);

router.post('/create', uploadAvatar.single('avatar_img'), usersController.create);

// router.post('/create', uploadAvatar.single('product_img'), validationCreateUser, usersController.create);

// router.get('/ingresar', guestMiddleware, userBaseController.login);

// router.get('/registro', guestMiddleware, userBaseController.register);

// router.get('/perfil',authMiddleware, userBaseController.profile);

// router.get('/editar', userBaseController.edit);

// router.get('/salir', userBaseController.logout);

// router.post('/acceder', userBaseController.access);

// router.post('/',uploadFile.single("avatar"),validations, userBaseController.save);

// router.put('/perfil', userBaseController.update);

// router.delete('/desactivar', userBaseController.disable);


module.exports = router;
