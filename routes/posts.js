const router = require('express').Router();
const PostComponent = require('../components/post/post');
const PostQuery = require('../components/post/query/post-query');

router.get('/', async (req, res) => {
    const postComponent = new PostComponent(new PostQuery());
    const result = await postComponent.findAllPosts();
    res.status(result.status);
    res.send(result.result);
});

router.post('/', async (req,res) => {
    const postComponent = new PostComponent(new PostQuery());
    const result = await postComponent.createPost(req?.body);
    res.status(result.status);
    res.send(result.result);
});

module.exports = router;