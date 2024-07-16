const express = require('express');
const app = express();
const routeUser = require('./routes/user');
const routePosts = require('./routes/posts')
require("dotenv").config();


app.use('/users', routeUser);
app.use('/posts', routePosts);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, (error) => {
    if (error) {
        console.log(`Erro ao subir na porta ${PORT}: ${error}`);
        return;
    }
    console.log(`Aplicação rodando da porta ${PORT}!`);
});
