const path = require('path');
const { body } = require('express-validator');

usersValidation = [
	body('fname').notEmpty().withMessage('¿Cómo es tu nombre?'),
	body('lname').notEmpty().withMessage('¿Cómo es tu apellido?'),
	body('user').notEmpty().withMessage('Elige un nombre de usuario'),
	body('email').notEmpty().withMessage('Agrega un email').bail()
		.isEmail().withMessage('Agrega un email válido'),
	body('birth_date')
		.notEmpty().withMessage('Ingresa tu fecha de nacimiento').bail()
		.isDate().withMessage('El formato de la fecha es dd/mm/aaaa'),		
	body('password')
		.notEmpty().withMessage('Establece una contraseña').bail()
		.isLength({min: 8}).withMessage('La contraseña debe ser de, al menos, 8 caracteres'),
	body('confirm_pass')
		.notEmpty().withMessage('Confirma la contraseña').bail()
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Las contraseñas no coinciden');
			}
			return true;
			}),
	body('avatar_img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', ".jpeg", '.png', '.gif'];	

		if (!file) {
			throw new Error('Una imagen dice más que mil palabras');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones permitidas para el archivo son ${acceptedExtensions.join(', ')}`);
			}
		}
	return true;
		
	})
]

module.exports = usersValidation