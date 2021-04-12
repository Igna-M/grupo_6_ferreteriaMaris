const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
let bcrypt = require('bcrypt');

const usersInDBPath = path.resolve(__dirname, '../data/usersDB.json');
const usersInDB = () => JSON.parse(fs.readFileSync(usersInDBPath, 'utf-8'));
const permitsPath = path.resolve(__dirname, '../data/permits.json');
const permisos = JSON.parse(fs.readFileSync(permitsPath, 'utf-8'));


const usersController = {

    users: function(req, res){
        
        let aLaVista = {
            permisos: permisos,
            usuarios: usersInDB()
        }

        return res.render('users/usersList', aLaVista)
    },


    createForm: function(req, res){
        
        let aLaVista = {
            permisos: permisos
        }

        return res.render('users/createUser', aLaVista)
    },


    create: function(req, res){
        const errores = validationResult(req);

        let userInput = req.body
        
        if (!errores.isEmpty()) {
            if (req.file){
                let filePath = path.resolve(__dirname,'../public/images/uploads/users/' + req.file.filename);
                fs.unlinkSync(filePath);
            }

            let aLaVista = {
                permisos: permisos,
				errores: errores.mapped(),
				originalData: userInput
			}
			return res.render('users/createUser', aLaVista);
		}

        let usersInDataBase = usersInDB()
        let lastElement = usersInDataBase[usersInDataBase.length -1];
        let lastID = lastElement.id;
        let nextID = lastID + 1;
        let password = bcrypt.hashSync(req.body.password, 12);

        let administrador = req.body.admin == 'Sí' ? true : false

        let nuevoProducto = {
            id: nextID,
            fname: req.body.fname,
            lname: req.body.lname,
            user: req.body.user,
            email: req.body.email,
            permisos: req.body.permisos,
            admin: administrador,
            birth_date: req.body.birth_date,
            password: password,
            avatar: req.file.filename
        }

        usersInDataBase.push(nuevoProducto);

        let uploadProducts = JSON.stringify(usersInDataBase, null , 2);
		fs.writeFileSync(usersInDBPath, uploadProducts)

        return res.redirect('/users')
    },


    delete: (req, res) => {

        let newList = usersInDB().filter(usuario => usuario.id != req.body.borrar);
        
		let deleteImage = usersInDB().find(usuario => usuario.id == req.body.borrar);

		let imagePath = path.resolve(__dirname,'../public/images/uploads/users/' + deleteImage.avatar);

		fs.unlinkSync(imagePath);
         

        let uploadProducts = JSON.stringify(newList, null , 2);
		fs.writeFileSync(usersInDBPath, uploadProducts)

		return res.redirect('/users');
    }
    
    
}

module.exports = usersController
