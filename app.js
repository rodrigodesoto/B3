const express = require('express');
const app = express();
const indexRoute  = require('./src/Routes/index');
const usersRoute = require('./src/Routes/users')
const cotacoesRoute = require('./src/Routes/acoesCarteira') 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/config/config');
const url = config.bd_string;
const options = {useNewUrlParser: true};
require('dotenv').config()
const port =process.env.PORT;

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
app.use('/cotacoes', cotacoesRoute);

app.listen(port, () => {
    console.info(`Porta: ${port}`);
});

module.exports = app;

