const router = require('express').Router();
const PostComponent = require('../components/post/post');
const PostQuery = require('../components/post/query/post-query');

router.get('/', (req, res) => {
    res.send('chegou até aqui a requisicao dos posts!');
});

router.post('/', async (req,res) => {
    const postComponent = new PostComponent(new PostQuery());
    const result = await postComponent.createPost(req?.body);
    res.status(result.status);
    res.send(result.result);
});

module.exports = router;