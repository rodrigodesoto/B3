const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Carteira = require('../model/carteira');

router.get('/carteira', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Essa informação é muito importante! Usuários não autorizados não deveriam recbê-la!'});
});

router.post('/cotacoes', auth, (req, res) => {
    try{
        await Carteira.create(req.body, (err, data) => {
            if(err) return res.status(400).send({ error: 'Erro ao cadastrar cotações!'});

            return res.status(201).send({data, token: createUserToken(data.id)});
        });
    }catch(err){
        return res.status(500).send({ error: 'Erro no endPoint cotacoes!'});
    }
});

module.exports = router;