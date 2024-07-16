const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('chegou aqui a requisição hein!');
});

module.exports = router;