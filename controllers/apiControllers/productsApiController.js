const db = require("../../database/models");
const Products = db.Product
const Categories = db.Category
const Op = db.Sequelize.Op


const productsController = {

    productsList: (req,res) =>{
        Products.findAll({
            include: [{association: 'categories'}]
        })
        .then(productos => {
            return res.status(200).json({
                total: productos.length,
                data: productos,
                status: 200
            })
        })        
    },

    showProduct: (req,res) =>{
        Products.findByPk(req.params.id)
        .then(producto => {
            return res.status(200).json({
                data: producto,
                status: 200
            })
        })
    },

    storeProduct: (req,res) =>{
        Products.create(req.body)
        .then(producto => {
            return res.status(200).json({
                data: producto,
                status: 200,
                created: 'ok'
            })
        })        
    },

    deleteProduct: (req,res) =>{
        Products.destroy({
            where: {id: req.params.id}
        })
        .then(response => {
            return res.json(response)
        })        
    },

    searchProduct: (req,res) =>{
        Products.findAll({
            where: {
                name: {[Op.like]: '%' + req.query.keyword + '%'}
            }
        })
        .then(producto => {
            if (producto.length < 1){
                return res.status(200).json("No hay productos que contengan esa palabra en el nombre")    
            } else {
                return res.status(200).json({
                    productosEncontrados: producto.length,
                    data: producto,
                    status: 200
                })
            }
        })
    },


    products: (req,res) =>{

        var hostname = req.headers.host; // hostname = 'localhost:3000'

        let getCategorias = Categories.findAll(
            {
            include: [{association: 'productos'}]
        })
        
        let getProductos = Products.findAll({
            include: [{association: 'categories'}]
        })
        
        Promise.all([getCategorias, getProductos])
            .then(function([categorias, productos]){
                cadaCategoria = []
                categorias.map(function(categ){
                    let categ_temp = categ.category_name
                    let cant_prod = categ.productos.length
                    cadaCategoria.push([categ_temp, cant_prod])
                })
                
                return res.status(200).json({
                    count: productos.length,
                    countByCategory:
                    {
                        Heramientas: productos.filter(prod => prod.category_id == 1).length,
                        Tornillos: productos.filter(prod => prod.category_id == 2).length,
                        Electricidad: productos.filter(prod => prod.category_id == 3).length,
                        Maquinaria: productos.filter(prod => prod.category_id == 4).length,
                        Clavos: productos.filter(prod => prod.category_id == 5).length,
                        Otros: productos.filter(prod => prod.category_id == 6).length
                    },
                    countByCategoryV2: cadaCategoria,
                    products: productos.map(function(unProducto){
                        return {
                            id: unProducto.id,
                            name: unProducto.name,
                            brand: unProducto.brand,
                            model: unProducto.model,
                            stock: unProducto.amount,
                            price: unProducto.price,
                            category: unProducto.categories.category_name,
                            link: 'http://' + hostname + '/products/api/Product/'+unProducto.id
                        }
                    }),
                    status: 200,
                })
                .catch(error => {
                    console.error(error.message)
                        return res.json('Ha ocurrido un error')
                });
        })
    },

    productDetail: (req,res) =>{
        let getCategorias = Categories.findAll(
            {
            include: [{association: 'productos'}]
        })
        
        let getProducto = Products.findByPk(req.params.id, {
            include: [{association: 'categories'}]
        })

        Promise.all([getCategorias, getProducto])
            .then(function([categorias, producto]){
                if (!producto){
                    return res.status(200).json("No hay productos con el ID ingresado")
                } else {
                    return res.status(200).json({
                        id: producto.id,
                        name: producto.name,
                        brand: producto.brand,
                        model: producto.model,
                        description: producto.description,
                        category: producto.categories.category_name,
                        features: producto.features,
                        price: producto.price,
                        amount: producto.amount,
                        image: producto.image,
                        status: 200
                    })
                }
            })
        .catch(error => {
            console.error(error.message)
                return res.json('Ha ocurrido un error')
        });
    },

}

module.exports = productsController;