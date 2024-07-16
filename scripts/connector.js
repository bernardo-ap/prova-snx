require('dotenv').config();
const mysql = require('mysql2');

// Cria a conexão com o banco de dados
const connection = await mysql.createConnection({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    port: process.env.MYSQLDB_LOCAL_PORT,
});

// Exporta a conexão para ser usada em outros arquivos
module.exports = connection;