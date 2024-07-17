require('dotenv').config();
require('./entity/env-validator');
const express = require('express');
const app = express();
const routeUser = require('./routes/user');
const routePosts = require('./routes/posts');


app.use('/users', routeUser);
app.use('/post', routePosts);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
    if (error) {
        console.log(`Erro ao subir na porta ${PORT}: ${error}`);
        return;
    }
    console.log(`Aplicação rodando da porta ${PORT}!`);
});
