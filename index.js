require('dotenv').config();
require('./entity/env-validator');
const express = require('express');
const app = express();
const routeComment = require('./routes/comment');
const routePosts = require('./routes/posts');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/comment', routeComment);
app.use('/post', routePosts);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    if (error) {
        console.log(`Erro ao subir na porta ${PORT}: ${error}`);
        return;
    }
    console.log(`Aplicação rodando da porta ${PORT}!`);
});
