const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Acao = require('../model/acao');
const codAcaoEnum = require('../config/codAcao');
var cotacoesBovespa = require('cotacoes-bovespa');

router.get('/carteira', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Aqui é para buscar as cotações!'});
});

router.post('/insereAcoes', auth, async (req, res) => {
    try{
        var col = codAcaoEnum;
        for(var codAcao in col) {
            if (await Acao.findOne({codAcao})) continue;
            const pass_ok = await salvarAcao(codAcao);
            if(!pass_ok) return res.status(400).send({ error: 'Erro ao cadastrar cotações!'});        
        }
        return res.status(201).
        send({message: 'Cotações salvas com sucesso!'});
    }catch(err){
        return res.status(500).send({ error: 'Erro no endPoint cotacoes!'});
    }
});

async function salvarAcao(codAcao){
    const ret = true;
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
            vlrTotal: 1000,
            vlrLucro: 9.99,
            prcLucro: 10,
            dtAtual: new Date()
    }
   
   Acao.create(acaoCarteira, (err, data) => {
    if(err) ret = false;
        });
    });
    return ret;
//     var yesterday = new Date('2022-03-24');
//     var agora = new Date('2022-03-25');
//   await cotacoesBovespa.getHistoricalData(codAcao, yesterday, agora, function (err, quotes) {
//         console.log(quotes);
//     });
}

module.exports = router;