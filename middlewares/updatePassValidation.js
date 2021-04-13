const path = require('path');
const { body } = require('express-validator');

let updatePassValidation = [
	body('email').notEmpty().withMessage('Debes ingresar tu email').bail()
		.isEmail().withMessage('No has ingresado un email'),
	body('old_password')
		.notEmpty().withMessage('Debes ingresar tu contraseña anterior').bail()
		.isLength({min: 8}).withMessage('La contraseña ingresada no coincide con la vieja contraseña'),
	body('new_password')
		.notEmpty().withMessage('Debes ingresar una nueva contraseña').bail()
		.isLength({min: 8}).withMessage('La contraseña debe ser de, al menos, 8 caracteres'),
	body('confirm_pass')
		.notEmpty().withMessage('Confirma la contraseña').bail()
		.custom((value, { req }) => {
			if (value !== req.body.new_password) {
				throw new Error('Las contraseñas no coinciden');
			}
			return true;
			})
]

module.exports = updatePassValidation