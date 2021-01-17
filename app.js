const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3030, ()=>{
    console.log('Servidor funcionando en http://localhost:3030/');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});




app.get('/productDetail', (req,res)=>{
    res.sendFile(__dirname + '/views/productDetail.html');
});

app.get('/productCart', (req,res)=>{
    res.sendFile(__dirname + '/views/productCart.html');
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/views/register.html');
});
