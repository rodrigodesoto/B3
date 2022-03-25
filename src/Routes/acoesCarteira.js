const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//FUNÇÕES AUXILIARERS
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in});
}   

router.get('/', async (req, res) => {
    try{
        const users = await Users.find({});
        return res.send(users);
    }catch(err){
        return res.status(500).send({error: 'Erro na consulta do usuário!'});
    }
});

router.post('/create', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try{
        if (await Users.findOne({email})) return res.status(400).send({ error: 'Usuário já registrado!'});
        await Users.create(req.body, (err, data) => {
            if(err) return res.status(400).send({ error: 'Erro ao criar usuário!'});

            data.password = undefined;
            return res.status(201).send({data, token: createUserToken(data.id)});
        });
    }catch(err){
        return res.status(500).send({ error: 'Erro ao buscar usuário!'});
    }
});

router.post('/auth', async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

    try{
        const user = await Users.findOne({email}).select('+password');
        if(!user) return res.status(400).send({ error: 'Usuário não registrado!'});
        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar o usuário!'});  

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    }catch(err){
        return res.status(500).send({ error: 'Erro ao buscar usuário!'});
    }
});

module.exports = router;

/*
200 - OK
201 - Created
202 - Accepted

400 - Bad request
401 - Unathorized  -- AUTENTICAÇÂO, tem carater temporário.
403 - Forbidden  -- AUTORIZAÇÂO, tem carater permanente.
404 - Not found 

500 - Internal server error
501 - Not implemented - a API não suporta essa funcionalidade
503 - Service Unavailable - a API executa essa operação mas no momento está indisponível

*/