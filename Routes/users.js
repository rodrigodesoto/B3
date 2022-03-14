const express = require('express');
const router = express.Router();
const Users = require('../model/user');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) return res.send({ error: 'Erro na consulta de usuários'});
        return res.send(data);
    })
});

router.post('/', (req, res) => {
    let obj = req.query;
    return res.send({message: `Ação código: ${obj.codAcao} da rota de usuários`});
});

router.post('/create', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try{
        if (await Users.findOne({email})) return res.status(400).send({ error: 'Usuário já registrado!'});
        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({user, token: createUserToken(user.id)});
    }catch(err){
        return res.status(500).send({ error: 'Erro ao buscar usuário!'});
    }
})

module.exports = router;