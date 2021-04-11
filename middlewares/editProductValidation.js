const path = require('path');
const { body } = require('express-validator');

const validaciones = [
	body('name').notEmpty().withMessage('El producto debe tener un nombre'),
	body('brand').notEmpty().withMessage('El producto debe tener una marca'),
	body('model').notEmpty().withMessage('El producto debe tener un modelo'),
	body('description').notEmpty().withMessage('El producto debe tener una descripción'),
	body('features').notEmpty().withMessage('Es una buena idea incluir las características del producto'),
	body('price')
		.notEmpty().withMessage('¿Cuál es tu precio?').bail()
		.isNumeric().withMessage('Dime un numero'),
    body('amount')
		.notEmpty().withMessage('¿Cuántos tenemos?').bail().
		isNumeric().withMessage('Dime un numero'),
	body('product_img').custom((value, { req }) => {
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


module.exports = validaciones