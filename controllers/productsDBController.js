const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator');
const db = require("../database/models");

const Products = db.Product;
const Categories = db.Category


const productsDBController = {

    productsList: async (req,res) =>{

        let products = await Products.findAll();
        let categories = await Categories.findAll();

        let aLaVista = {
            categories: categories,
            products: products
        }
        
        return res.render('products-db/productsList', aLaVista);
    }, 


    createProduct: async (req,res) =>{

        let categories = await Categories.findAll();

        return res.render('products-db/create', {categories: categories});
    },


    create: async (req, res) => {

        let categories = await Categories.findAll();
        
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            if (req.file){
                // console.log("Entramos al if de la imagen");
                let filePath = path.resolve(__dirname,'../public/images/uploads/products/' + req.file.filename);
                fs.unlinkSync(filePath);
            }

            let aLaVista = {
                categories: categories,
				errores: errores.mapped(),
				originalData: req.body
			}
			return res.render('products-db/create', aLaVista);
		}
        
        await Products.create({
            name: req.body.name,
            brand: req.body.brand,
            model: req.body.model,
            description: req.body.description,
            category_id: req.body.category,
            features: req.body.features,
            price: req.body.price,
            amount: req.body.amount,
            image: req.file.filename
        })

        return res.redirect('/products/db');
    },


    delete: async (req, res) => {

        let productoParaBorrar = await Products.findOne({
            where: {
                id: req.body.borrar
            } })
            
        await Products.destroy({where: {id: req.body.borrar}, force: true})

        // let newList = productsInDB().filter(producto => producto.id != req.body.borrar);
        
		// let deleteImage = productsInDB().find(producto => producto.id == req.body.borrar);

		let imagePath = path.resolve(__dirname,'../public/images/uploads/products/' + productoParaBorrar.image);

		fs.unlinkSync(imagePath);

		return res.redirect('/products/db');
    },

    destroy: async (req, res) => {
        
        let productoDetalle = await Products.findOne({
            where: {
                id: req.params.id
            } })

        await Products.destroy({where: {id: req.params.id}, force: true})

		let filePath = path.resolve(__dirname,'../public/img/products/' + productoDetalle.image);

		fs.unlinkSync(filePath);
		

		res.redirect("/")
    },



    // // // // // // // // // // // // // // // // // // // // // // 
    // 
    // 


    
    
    // // Edit es la vista del producto que voy a editar
    // edit: function(req, res) {
        
    //     let editarProd = productsInDB().find(producto => producto.id == req.params.id);

    //     let aLaVista = {
    //         categories: categories,
    //         producto: editarProd
    //     }
    //     return res.render('products/edit', aLaVista);
    // },
    
    // // Recibo los datos del producto que quiero editar
    // update: (req, res) => {
        
    //     let editarProd = productsInDB().find(producto => producto.id == req.params.id);
    //     const errores = validationResult(req);
        
    //     /// Validación y borrado de imagen OK. Si en el update, pongo una extensión no aceptada, avisa y borra el archivo.
    //     // Si en los datos actualizados encuentra un error, y subí un archivo, borra ese archivo.
    //     // Si no hay error, el archivo se carga (Al actualizar la base de datos, tengo que borrar el archivo anterior.)

    //     if (!errores.isEmpty()) {
    //         if (req.file){
    //             let filePath = path.resolve(__dirname,'../public/images/uploads/products/' + req.file.filename);
    //             fs.unlinkSync(filePath);
    //         }

    //         let aLaVista = {
    //             categories: categories,
	// 			errores: errores.mapped(),
	// 			userData: req.body,
    //             producto: editarProd
	// 		}
	// 		return res.render('products/edit', aLaVista);

    //     }

    //     let imageInNewProd = editarProd.image
    //     if (req.file){
    //         imageInNewProd = req.file.filename

    //         let filePath = path.resolve(__dirname,'../public/images/uploads/products/' + editarProd.image);
    //         console.log('Imagen borrada:', editarProd.image);
    //         fs.unlinkSync(filePath);
    //     } 

    //     let nuevoProducto = {
    //         id: editarProd.id,
    //         ...req.body,
    //         image: imageInNewProd
    //     }

    //     nuevaDB = productsInDB().map(function(producto){

    //         if (producto.id == editarProd.id){
    //             producto = nuevoProducto
    //         }

    //         return producto

    //     })
        
    //     let uploadProducts = JSON.stringify(nuevaDB, null , 2);
	// 	fs.writeFileSync(productsDataDBPath, uploadProducts)

    //     return res.redirect('/products');

    // }

}

module.exports = productsDBController
