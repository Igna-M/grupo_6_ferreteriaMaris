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
                let seleecion_1 = productos.data.filter(prod => prod.category_id == 1)
                let seleecion_2 = seleecion_1.filter(prod => prod.amount != 0)
                
                precios = []
                for (let i = 0; i < seleecion_2.length; i++){
                    precios.push(seleecion_2[i].price)
                }
                precios.sort().reverse()
                
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
        let productID = req.params.id
        var hostname = req.headers.host; // hostname = 'localhost:3000'
        // let apiUrl = 'http://' + hostname + '/products/api/product/' + productID
        let apiUrlTodos = 'http://' + hostname + '/products/api/productsList'
        
        fetch(apiUrlTodos)
            .then(function(response){
                return response.json()
            })
            .then(function(producto){

                function getRandomInt(max) {
                    return Math.floor(Math.random() * max);
                }

                let resultados = producto.data

                let miProducto = resultados.find(prod => prod.id == productID)

                let otrosProductos = resultados.filter(prod => prod.id != productID)
                let cantProductos = otrosProductos.length
                let random_1 = getRandomInt(cantProductos)
                let random_2 = getRandomInt(cantProductos)

                if (random_1 == random_2){
                    while (random_1 == random_2) {
                        random_2 = getRandomInt(cantProductos)
                        console.log('');
                        console.log('');
                        console.log('Random1', random_1);
                        console.log('Random2', random_2);
                        console.log('');
                    }
                }
                
                let aLaVista = {
                    product: miProducto,
                    otroProducto_1: otrosProductos[random_1],
                    otroProducto_2: otrosProductos[random_2]
                }
                
                return res.render('productDetail', aLaVista);
            })
            .catch(function(error){
                console.log('Catch Activado! Hubo un error');
                return res.send('Hubo un error')
            })


        // return res.render('productDetail');
    },


    productDetail_backUp:function(req, res) {
        let productID = req.params.id
        var hostname = req.headers.host; // hostname = 'localhost:3000'
        let apiUrl = 'http://' + hostname + '/products/api/product/' + productID

        
        fetch(apiUrl)
            .then(function(response){
                return response.json()
            })
            .then(function(producto){
                let aLaVista = {
                    product: producto
                }
                
                // return res.send(aLaVista);
                return res.render('productDetail', aLaVista);
            })
            .catch(function(error){
                console.log('Catch Activado! Hubo un error');
                return res.send('Hubo un error')
            })

        // return res.render('productDetail');
    },

    register:function(req, res) {
        return res.render('register');        
    },

    login:function(req, res) {
        return res.render('login');        
    },

}


module.exports = mainController