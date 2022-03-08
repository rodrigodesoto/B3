'use strict';
var cotacoesBovespa = require('cotacoes-bovespa');

cotacoesBovespa.getCurrentQuote('PETR4', function (err, quote) {
    console.log(quote.price);
});