const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsDataDBPath = path.resolve(__dirname, '../data/productsDB.json');
const productsInDB = JSON.parse(fs.readFileSync(productsDataDBPath, 'utf-8'));
const categoriesDataDBPath = path.resolve(__dirname, '../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesDataDBPath, 'utf-8'));

const productsController = {

    productsList: function(req, res) {
        
        return res.render('products/productsList');
    },

    createProduct: function(req, res) {
        return res.render('products/create', {categories: categories});
    },

    create: function(req, res) {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {

            let filePath = path.resolve(__dirname,'../public/images/uploads/' + req.file.filename);
            fs.unlinkSync(filePath);

            let aLaVista = {
                categories: categories,
				errores: errores.mapped(),
				originalData: req.body
			}
			return res.render('products/create', aLaVista);
		}
        
        let lastElement = productsInDB[productsInDB.length -1];
        let lastID = lastElement.id;
        let nextID = lastID + 1;

        // let nuevoProducto = {
        //     id: nextID,
		// 	   name: req.body.name,
		// 	   brand: req.body.brand,
		// 	   model: req.body.model,
        //     description: req.body.description,
        //     category: req.body.category,
        //     features: req.body.features,
        //     price: req.body.price,
        //     amount: req.body.amount,
        //     image: req.file.filename
		// };  

        let nuevoProducto = {
            id: nextID,
            ...req.body,
            image: req.file.filename
        }

        productsInDB.push(nuevoProducto);

        console.log('');
        console.log('DataBase + Producto nuevo');
        console.log(productsInDB);

        let uploadProducts = JSON.stringify(productsInDB, null , 2);
		fs.writeFileSync(productsDataDBPath, uploadProducts)

        return res.send(productsInDB);
    }
    
}

module.exports = productsController
