const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersInDBPath = path.resolve(__dirname, '../data/usersDB.json');
const usersInDB = () => JSON.parse(fs.readFileSync(usersInDBPath, 'utf-8'));
const prmitsPath = path.resolve(__dirname, '../data/permits.json');
const permisos = JSON.parse(fs.readFileSync(prmitsPath, 'utf-8'));


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
            permisos: permisos,
            // usuarios: usersInDB()
        }

        return res.render('users/createUser', aLaVista)
    },

    create: function(req, res){
        

        let userInput = req.body
        let userAvatar = req.file

        let aLaVista = {
            userInput,
            userAvatar
        }

        return res.send(aLaVista)
    }
    
}

module.exports = usersController
