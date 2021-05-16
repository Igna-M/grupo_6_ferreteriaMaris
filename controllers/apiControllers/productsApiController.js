const db = require("../../database/models");
const Products = db.Product
const Categories = db.Category
const Op = db.Sequelize.Op



const productsController = {

    productsList: (req,res) =>{
        Products.findAll()
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
        let getCategorias = Categories.findAll(
            {
            include: [{association: 'productos'}]
        })
        
        let getProductos = Products.findAll({
            include: [{association: 'categories'}]
        })

        Promise.all([getCategorias, getProductos])
            .then(function([categorias, productos]){
                return res.status(200).json({
                    count: productos.length,
                    countByCategory: 'Cantidad por categoría',
                    products: productos.map(function(unProducto){
                        return {
                            id: unProducto.id,
                            name: unProducto.name,
                            brand: unProducto.brand,
                            model: unProducto.model,
                            stock: unProducto.amount,
                            category: unProducto.categories.category_name,
                            link: '/products/api/Product/'+unProducto.id
                        }
                    }),
                    status: 200
                })
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
            })
    },

}

module.exports = productsController;