const express = require('express');
const app = express();
const indexRoute  = require('./Routes/index');
const usersRoute = require('./Routes/users')

app.use('/', indexRoute);
app.use('/users', usersRoute);

// app.get('/cotacao', (req, res) => {
//     let obj = req.query;
//     return res.send({message: `Ação código: ${obj.codAcao}`});
// })

// app.post('/', (req, res) => {
//     return res.send({message: 'Tudo ok com post!'});
// })

app.listen(3000);

module.exports = app;
/* var http = require('http');
var port = process.env.PORT || 1337;
var cotacoesBovespa = require('cotacoes-bovespa');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    cotacoesBovespa.getCurrentQuote('VIVT3', function (err, quote) {
        console.log(quote.price);
        res.end('VIVT3: '+quote.price);
    });
}).listen(port); */
