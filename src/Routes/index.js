const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Essa informação é muito importante! Usuários não autorizados não deveriam recbê-la!'});
});

router.post('/', (req, res) => {
    let obj = req.query;
    return res.send({message: `Ação código: ${obj.codAcao} da raiz`});
});

module.exports = router;