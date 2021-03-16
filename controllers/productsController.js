
const productsController = {
    products: function(req, res) {
        res.render('products');
    },
    create:  function(req, res) {
        console.log(req.file)
        res.send('Archivo subido correctamente');
        // next()

    },
    
}


module.exports = productsController