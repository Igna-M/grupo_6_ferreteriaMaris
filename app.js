const express = require('express');
const app = express();

app.use(express.static('public'));

<<<<<<< HEAD
app.listen(process.env.PORT || 3030, ()=>{
=======
app.listen(3030, ()=>{
>>>>>>> e254ec070eed235f9a38bc87aac1077adbaaafcc
    console.log('Servidor funcionando en http://localhost:3030/');
});

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
});

