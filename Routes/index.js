const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let obj = req.query;
    return res.send({message: `Ação código: ${obj.codAcao} da raiz`});
});

router.post('/', (req, res) => {
    let obj = req.query;
    return res.send({message: `Ação código: ${obj.codAcao} da raiz`});
});

module.exports = router;