const mainController = {
    index: function(req, res) {
        return res.render('index');
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