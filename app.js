const express = require('express');
const app = express();
const indexRoute  = require('./src/Routes/index');
const usersRoute = require('./src/Routes/users')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://127.0.0.1:27017/B3';
const options = {useNewUrlParser: true};

mongoose.connect(url, options);
// mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o Banco de Dados: '+err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do Banco de Dados');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao Banco de Dados!');
})


//BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;

