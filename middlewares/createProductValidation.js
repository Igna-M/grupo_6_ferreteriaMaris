const path = require('path');
const { body } = require('express-validator');

module.exports = [
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
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', ".jpeg"];

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