var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');
const uploadAvatar = require("../middlewares/usersMulter")
const validationCreateUser = require('../middlewares/createUserValidation');
const validationUpdateUser = require('../middlewares/editUserValidation');
const updatePassValidation = require('../middlewares/updatePassValidation');


router.get('/', usersController.users);

router.get('/create', usersController.createForm);

router.post('/create', uploadAvatar.single('avatar_img'), validationCreateUser, usersController.create);

router.post('/delete', usersController.delete);

router.get('/edit/:id', usersController.edit);

router.post('/update', uploadAvatar.single('avatar_img'), validationUpdateUser, usersController.update);

router.get('/updatePass/:id', usersController.updatePassForm);

router.post('/updatePassword', updatePassValidation, usersController.updatePass);

router.get('/login', usersController.login);

router.post('/login', usersController.loginProcess);

router.get('/profile/:id', usersController.profile);


module.exports = router;
