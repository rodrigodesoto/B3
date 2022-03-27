const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Carteira = require('../model/carteira');
const codAcaoEnum = require('../config/codAcao');
var cotacoesBovespa = require('cotacoes-bovespa');

router.get('/carteira', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Aqui é para buscar as cotações!'});
});

router.post('/postCotacao', auth, async (req, res) => {
    try{
        var col = codAcaoEnum;
        for(var codAcao in col) {
            await salvarAcao(codAcao);       
        }
        return res.status(201).
        send({message: 'Cotações salvas com sucesso!'});
    }catch(err){
        return res.status(500).send({ error: 'Erro no endPoint cotacoes!'});
    }
});

async function salvarAcao(codAcao){
    cotacoesBovespa.getCurrentQuote(codAcao, function (err, quote) {
        console.log(quote.price);
        const acaoCarteira = {
            codAcao: codAcao,
            vlrAtual: quote.price,
            vlrCompra: 100,
            varDia: quote.marketChange,
            var30d: 6.66,
            var12m: 6.66,
            qtd: 10,
            vlrInvest: 1000,
            vlrTotal: qtd*vlrAtual,
            vlrLucro: vlrTotal-vlrInvest,
            prcLucro: (vlrLucro/vlrInvest)*100,
            dtAtual: new Date()
    }
    Carteira.create(acaoCarteira, (err, data) => {
        if(err) return res.status(400).send({ error: 'Erro ao cadastrar cotações!'});
        });
    });
}

module.exports = router;