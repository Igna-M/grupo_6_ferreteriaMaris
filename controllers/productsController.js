const fs = require('fs');

const productsController = {
    products: function(req, res) {
        return res.render('products');
    },
    create: function(req, res) {
        datosCapturados = req.body
        archivoCapturado = req.file
        unProducto = [datosCapturados, archivoCapturado]
        
        fs.writeFileSync('./public/jsonProducts/datosProductos', JSON.stringify(unProducto))

        return res.send(unProducto);
        

    },
    
}

module.exports = productsController