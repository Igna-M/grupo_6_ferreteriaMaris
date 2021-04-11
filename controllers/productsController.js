const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsDataDBPath = path.resolve(__dirname, '../data/productsDB.json');
const productsInDB = () => JSON.parse(fs.readFileSync(productsDataDBPath, 'utf-8'));
const categoriesDataDBPath = path.resolve(__dirname, '../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesDataDBPath, 'utf-8'));

const productsController = {

    productsList: function(req, res) {
        let aLaVista = {
            categories: categories,
            products: productsInDB()
        }
        return res.render('products/productsList', aLaVista);
    },


    createProduct: function(req, res) {
        return res.render('products/create', {categories: categories});
    },


    create: function(req, res) {
        const errores = validationResult(req);
        // console.log(errores);      

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
			return res.render('products/create', aLaVista);
		}
        
        let dataInDB = productsInDB()
        let lastElement = dataInDB[dataInDB.length -1];
        let lastID = lastElement.id;
        let nextID = lastID + 1;

        let nuevoProducto = {
            id: nextID,
            ...req.body,
            image: req.file.filename
        }

        dataInDB.push(nuevoProducto);

        let uploadProducts = JSON.stringify(dataInDB, null , 2);
		fs.writeFileSync(productsDataDBPath, uploadProducts)

        return res.redirect('/products');
    },


    delete: (req, res) => {

        let newList = productsInDB().filter(producto => producto.id != req.body.borrar);
        
		let deleteImage = productsInDB().find(producto => producto.id == req.body.borrar);

		let imagePath = path.resolve(__dirname,'../public/images/uploads/products/' + deleteImage.image);

		fs.unlinkSync(imagePath);
         

        let uploadProducts = JSON.stringify(newList, null , 2);
		fs.writeFileSync(productsDataDBPath, uploadProducts)

		return res.redirect('/products');
    },
    
    // Edit es la vista del producto que voy a editar
    edit: function(req, res) {
        
        let editarProd = productsInDB().find(producto => producto.id == req.params.id);

        let aLaVista = {
            categories: categories,
            producto: editarProd
        }
        return res.render('products/edit', aLaVista);
    },
    
    // Recibo los datos del producto que quiero editar
    update: (req, res) => {
        // USAR MAP PARA ACTUALIZAR EL ELEMENTO DEL ARRAY
        const errores = validationResult(req);
        console.log(errores);

        if (!errores.isEmpty()) {
            if (req.file){
                let filePath = path.resolve(__dirname,'../public/images/uploads/products/' + req.file.filename);
                fs.unlinkSync(filePath);
            }

            /// Hasta acá, estamos muy bien. Si en el update, pongo una extensión no aceptada, borra el archivop.
            // Si en los datos actualizados encuentra un error, y subí un archivo, borra ese archivo.
            // Si no hay error, el archivo se carga (Por ahora no borré el archivo anterior.)
            

        }




        console.log('Llegamos a Update!!!');
        datosCapturados = req.body
        console.log(datosCapturados);

        if (req.file) {
            console.log(req.file);
        }

   

        return res.send('Bien, llegaste al update!!!')
    },
    
    // Necesitamos un método para cargar en BULK a través de un csv
    // Después, puede mostrar las características de los datos y darte la opción de cargar las fotos.






    // Update product del formulario de edición.
    //     updateProduct: (req, res) => {

    //         return res.render(req)

    //     //     let editarProd = productsInDB().find(producto => producto.id == req.params.id);
            
    //     //     let nuevoProducto = {
    //     //         id: editarProd.id,
    //     //         ...req.body,
    //     //         image: req.file.filename
    //     //     }
            
    //     //  let productoSubir = JSON.stringify(productoEditado, null , 2);
    //     //  fs.writeFileSync(productsFilePath,productoSubir);

    //     //  res.redirect("/")    
    // }

}

module.exports = productsController
