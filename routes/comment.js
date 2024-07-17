const CommentComponent = require('../components/comment/comment');
const CommentQuery = require('../components/comment/query/comment-query');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const commentComponent = new CommentComponent(new CommentQuery());
    const result = await commentComponent.findAllComments();
    res.status(result.status);
    res.send(result.result);
});

router.get('/:id', async(req,res) => {
    const commentComponent = new CommentComponent(new CommentQuery());
    const result = await commentComponent.findComment(req?.params?.id);
    res.status(result.status);
    res.send(result.result);
});

router.post('/', async (req,res) => {
    const commentComponent = new CommentComponent(new CommentQuery());
    const result = await commentComponent.createComment(req?.body);
    res.status(result.status);
    res.send(result.result);
});

router.put('/:id', async(req,res) => {
    const commentComponent = new CommentComponent(new CommentQuery());
    const result = await commentComponent.updateComment(req?.params?.id, req?.body);
    res.status(result.status);
    res.send(result.result);
});

router.delete('/:id', async (req,res) => {
    const commentComponent = new CommentComponent(new CommentQuery());
    const result = await commentComponent.deleteComment(req?.params?.id);
    res.status(result.status);
    res.send(result.result);
});

module.exports = router;