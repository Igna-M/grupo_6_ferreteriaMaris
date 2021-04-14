var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const uploadAvatar = require("../middlewares/usersMulter")
const validationCreateUser = require('../middlewares/createUserValidation');
const validationUpdateUser = require('../middlewares/editUserValidation');
const updatePassValidation = require('../middlewares/updatePassValidation');

// para redireccionar al profile desde las rutas que sirven para entrar a la sesión
const guestMiddleware = require('../middlewares/guestMiddleware')

// para filtrar a quienes no están logueados
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/', usersController.users);

router.get('/create', guestMiddleware, usersController.createForm);

router.post('/create', uploadAvatar.single('avatar_img'), validationCreateUser, usersController.create);

router.post('/delete', usersController.delete);

router.get('/edit/:id', usersController.edit);

router.post('/update', uploadAvatar.single('avatar_img'), validationUpdateUser, usersController.update);

router.get('/updatePass/:id', usersController.updatePassForm);

router.post('/updatePassword', updatePassValidation, usersController.updatePass);

router.get('/login', guestMiddleware, usersController.login);

router.post('/login', usersController.loginProcess);

// router.get('/profile/:id', usersController.profile);

router.get('/profile', authMiddleware, usersController.profile);

router.get('/logout', authMiddleware, usersController.logout);


module.exports = router;
