'use strict';
var cotacoesBovespa = require('cotacoes-bovespa');

cotacoesBovespa.getCurrentQuote('PETR4', function (err, quote) {
    console.log(quote.price);
});

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