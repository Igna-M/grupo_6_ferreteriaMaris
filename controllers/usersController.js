const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// const { send } = require('process');

const usersInDBPath = path.resolve(__dirname, '../data/usersDB.json');
const usersInDB = () => JSON.parse(fs.readFileSync(usersInDBPath, 'utf-8'));
const permitsPath = path.resolve(__dirname, '../data/permits.json');
const permisos = JSON.parse(fs.readFileSync(permitsPath, 'utf-8'));
const User = require('../models/User')

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

        // Chequear si el mail ya existe
        let searchByMail = User.findByField('email', req.body.email)
        if (searchByMail){
            if (req.file){
                let filePath = path.resolve(__dirname,'../public/images/uploads/users/' + req.file.filename);
                fs.unlinkSync(filePath);
            }

            let errores = {
                email: {
                    msg: 'El email ingresado ya está registrado'
                },
                password: {
                    msg: 'Vuelve a generar una contraseña'
                },
                confirm_pass: {
                    msg: 'Confirma la contraseña'
                }
            }

            delete userInput.email
            let aLaVista = {
                permisos: permisos,
				errores: errores,
				originalData: userInput
			}
			return res.render('users/createUser', aLaVista);
        }

        let usersInDataBase = usersInDB()
        let lastElement = usersInDataBase[usersInDataBase.length -1];
        let lastID = lastElement.id;
        let nextID = lastID + 1;
        let password = bcrypt.hashSync(req.body.password, 12);

        let administrador = req.body.admin == 'True' ? true : false

        let newUser = {
            id: nextID,
            ...req.body,
            admin: administrador,
            password: password,
            avatar: req.file.filename
        }
        delete newUser.confirm_pass;

        usersInDataBase.push(newUser);

        let uploadProducts = JSON.stringify(usersInDataBase, null , 2);
		fs.writeFileSync(usersInDBPath, uploadProducts)

        if (req.body.remember_user){
            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60})
        }

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
    },


    // Edit es la vista del usuario que voy a editar
    edit: function(req, res) {
        
        let editUser = usersInDB().find(usuario => usuario.id == req.params.id);

        let aLaVista = {
            permisos: permisos,
            usuario: editUser
        }

        // return res.send(aLaVista);

        return res.render('users/editUsers', aLaVista);
    },
    

    // Recibo los datos del producto que quiero editar
    update: (req, res) => {
        console.log('En el update del controlador')
        let editUser = usersInDB().find(usuario => usuario.id == req.body.id);
        console.log(editUser);
        const errores = validationResult(req);

        if (!errores.isEmpty()) { // Si hay errores, que borre la foto que acaba de subir.
            

            let aLaVista = {
                permisos: permisos,
                usuario: editUser,
                errores: errores.mapped(),
                userData: req.body,
            }

            return res.render('users/editUsers', aLaVista);
        }

        let avatarInNewUser = editUser.avatar

        if (req.file){
            avatarInNewUser= req.file.filename

            let filePath = path.resolve(__dirname,'../public/images/uploads/USERS/' + editUser.avatar);
            fs.unlinkSync(filePath);
        } 

        // let password = bcrypt.hashSync(req.body.password, 12);
        let administrador = req.body.admin == 'True' ? true : false

        let newUser = {
            ...req.body,
            id: parseInt(editUser.id),
            admin: administrador,
            password: editUser.password,
            avatar: avatarInNewUser            
        }

        newDB = usersInDB().map(function(user){
            if (user.id == editUser.id){
                user = newUser
            }
            return user
        })
        
        let uploadUsers = JSON.stringify(newDB, null , 2);
        fs.writeFileSync(usersInDBPath, uploadUsers)

    return res.redirect('/users');
    },


    updatePassForm: function(req, res) {
        let editUser = usersInDB().find(usuario => usuario.id == req.params.id);
        let aLaVista = {
            usuario: editUser
        }
        return res.render('users/updatePass', aLaVista);
    },
    

    updatePass: function(req, res) {
        console.log('LLegamos a updatePass');
        console.log('updatePass.body:', req.body);
        let editUser = usersInDB().find(usuario => usuario.email == req.body.email);

        const errores = validationResult(req);
        console.log(errores);

        if (editUser == undefined){
            let aLaVista = {
                permisos: permisos,
                usuarios: usersInDB()
            }
            return res.redirect('/users')
        }

        if (!errores.isEmpty()) {
            let aLaVista = {
                usuario: editUser,
                errores: errores.mapped(),
                userData: req.body,
            }
            return res.render('users/updatePass', aLaVista);
        }

        let aLaVista = {
            body: req.body.email,
            usuario: editUser
        }
        return res.send(aLaVista)
        // return res.render('users/updatePass', aLaVista);
    },

    login: function(req, res){
        
        return res.render('users/login')
    },


    loginProcess: function(req, res){
        
        let userToLogin = User.findByField('email', req.body.email)

        if (!userToLogin){
            let errores = {
                password: {
                    msg: 'Los datos no concuerdan'
                },
            }
            let aLaVista = {
				errores: errores,
			}
            return res.render('users/login', aLaVista)
        } 
            
        let comparePassword = bcrypt.compareSync(req.body.password, userToLogin.password);

        if (!comparePassword){
            let errores = {
                password: {
                    msg: 'Los datos no concuerdan'
                },
            }
            let aLaVista = {
                errores: errores,
            }
            return res.render('users/login', aLaVista)

        } 
        
        delete userToLogin.password
        req.session.userLogged = userToLogin

        if (req.body.remember_user){
            res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 60})
        }
        
        return res.redirect('/users/profile')
    },


    profile: function(req, res){

        let userProfile = req.session.userLogged

        let aLaVista = {
            permisos: permisos,
            usuario: userProfile
        }

        return res.render('users/profile', aLaVista)
    },

    logout: function(req, res){
        res.clearCookie('userEmail')
        req.session.destroy()
        return res.redirect('/')
    },


}

module.exports = usersController
