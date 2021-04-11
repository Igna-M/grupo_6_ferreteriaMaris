const path = require('path');
const { body } = require('express-validator');

const validaciones = [
	body('name').notEmpty().withMessage('El producto debe tener un nombre. Seguimos usando el nombre original.'),
	body('brand').notEmpty().withMessage('El producto debe tener una marca. Seguimos usando la marca original.'),
	body('model').notEmpty().withMessage('El producto debe tener un modelo. Seguimos usando el modelo original.'),
	body('description').notEmpty().withMessage('El producto debe tener una descripción. Seguimos usando la descripción original.'),
	body('features').notEmpty().withMessage('Faltó la descripción. Seguimos usando la descripción original.'),
	body('price')
		.notEmpty().withMessage('¿Cuál es tu precio? Seguimos usando el precio original.').bail()
		.isNumeric().withMessage('Dime un numero'),
    body('amount')
		.notEmpty().withMessage('¿Cuántos tenemos? Seguimos usando la cantidad original.').bail().
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