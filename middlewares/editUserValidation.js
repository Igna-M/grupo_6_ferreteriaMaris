const path = require('path');
const { body } = require('express-validator');

let usersValidation = [
	body('fname').notEmpty().withMessage('¿Cómo es tu nombre?'),
	body('lname').notEmpty().withMessage('¿Cómo es tu apellido?'),
	body('user').notEmpty().withMessage('Elige un nombre de usuario'),
	// body('email').notEmpty().withMessage('Agrega un email').bail()
	// 	.isEmail().withMessage('Agrega un email válido'),
	body('birth_date')
		.notEmpty().withMessage('Ingresa tu fecha de nacimiento').bail()
		.isDate().withMessage('El formato de la fecha es dd/mm/aaaa'),		
	body('avatar_img').custom((value, { req }) => {
		if (req.file) {
		let file = req.file;
		let acceptedExtensions = ['.jpg', ".jpeg", '.png', '.gif'];	
		let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones permitidas para el archivo son ${acceptedExtensions.join(', ')}`);
			}
		}
	return true;
		
	})
]

module.exports = usersValidation