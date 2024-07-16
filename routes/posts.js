const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('chegou até aqui a requisicao dos posts!');
});

module.exports = router;