const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsDataDBPath = path.resolve(__dirname, '../data/productosDB.json');
const products = JSON.parse(fs.readFileSync(productsDataDBPath, 'utf-8'));
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
        if (!errores.isEmpty()) { // Si hay errores, tengo que volver a renderear el formulario, con los erores.

            let filePath = path.resolve(__dirname,'../public/img/products/' + req.file.filename);
            fs.unlinkSync(filePath);

            let enviarALaVista = {
                categories: categories,
				errors: resultValidation.mapped(),
				oldData: req.body
			}

			return res.render('products/create', enviarALaVista);
		}

        let nuevoProducto = {
			// id: products.length == 0 ? 1 : products[products.length -1].id +1,
			name: req.body.name,
			brand: req.body.brand,
			model: req.body.model,
            description: req.body.description,
            category: req.body.category,
            features: req.body.features,
            price: req.body.price,
            amount: req.body.amount,
            image: req.file.filename
		};


        // products.push(nuevoProducto);
        // let productoSubir = JSON.stringify(products, null , 2);
		// fs.writeFileSync(productsFilePath ,productoSubir)


        // let datosCapturados = req.body
        // let archivoCapturado = req.file
        // let unProducto = [datosCapturados, archivoCapturado]
        // fs.writeFileSync('../data/ProductosDB', JSON.stringify(unProducto))

        return res.send(unProducto);
    }
    
}

module.exports = productsController


// store:(req, res) => {
//     const resultValidation = validationResult(req);
//     if (resultValidation.errors.length > 0) {

//         let filePath = path.resolve(__dirname,'../public/img/products/' + req.file.filename);
//         fs.unlinkSync(filePath);

//         return res.render('products/productCreate', {
//             errors: resultValidation.mapped(),
//             oldData: req.body
//         });
//     }

//     let productoAgregar = {
//         id: products.length == 0 ? 1 : products[products.length -1].id +1,
//         name: req.body.name,
//         price: req.body.price,
//         color: req.body.color ,
//         accesorios: req.body.accesorios,
//         marca: req.body.marca,
//         modelo: req.body.modelo,
//         category: req.body.category ,
//         description: req.body.description,
//         image: req.file.filename

        
//     };

    
//     products.push(productoAgregar);
//     let productoSubir = JSON.stringify(products, null , 2);
//     fs.writeFileSync(productsFilePath ,productoSubir)
    

//     return res.redirect("/")
  
// },


    // list:(req,res)=>{
    //     // const productosList = products.find( producto => producto.id == req.params.id);

    //     let show = {}

    //     res.render('products/productsList', show)
    // },