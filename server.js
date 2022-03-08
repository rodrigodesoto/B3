'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var cotacoesBovespa = require('cotacoes-bovespa');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    cotacoesBovespa.getCurrentQuote('PRIO3', function (err, quote) {
        console.log(quote.price);
        res.end('PETR4: '+quote.price);
    });
}).listen(port);
