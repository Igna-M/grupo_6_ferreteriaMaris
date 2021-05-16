const fetch = require("node-fetch");

const mainController = {
    index: function(req, res) {

        var hostname = req.headers.host; // hostname = 'localhost:3000'
        // var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'

        let apiUrl = 'http://' + hostname + '/products/api/productsList'

        fetch(apiUrl)
            .then(function(response){
                return response.json()
            })
            .then(function(productos){
                // let InfoDelProducto = productos;
                let seleecion_1 = productos.data.filter(prod => prod.category_id == 1)
                let seleecion_2 = seleecion_1.filter(prod => prod.amount != 0)
                console.log('');
                console.log('Selección');
                console.log(seleecion_2);
                
                precios = []
                for (let i = 0; i < seleecion_2.length; i++){
                    precios.push(seleecion_2[i].price)
                }
                precios.sort().reverse()

                console.log('');
                console.log('Precios');
                console.log(precios);
                
                let mostrarNProductos = 4
                let showProducts = []
                for (let i = 0; i < mostrarNProductos; i++){
                    showProducts.push(seleecion_2.filter(prod => prod.price == precios[i])[0])
                }

                let aLaVista = {
                    products: showProducts
                }
                
                // return res.send(aLaVista)
                return res.render('index', aLaVista);
            })
            .catch(function(error){
                console.log('Catch Activado! Hubo un error');
                return res.send('Hubo un error')
            })
        
        // return res.render('index');
    },
    
    productCart: function(req, res) {
        return res.render('productCart');
    },

    productDetail:function(req, res) {
        return res.render('productDetail');
        
    },

    register:function(req, res) {
        return res.render('register');        
    },

    login:function(req, res) {
        return res.render('login');        
    },

}


module.exports = mainController