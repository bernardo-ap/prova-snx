require('dotenv').config();
const mysql = require('mysql2/promise');
const envValidator = require('../entity/env-validator');

class Connector {
    constructor() {
        this.host = envValidator.getVar('MYSQLDB_HOST');
        this.user = envValidator.getVar('MYSQLDB_USER');
        this.password = envValidator.getVar('MYSQLDB_ROOT_PASSWORD');
        this.database = envValidator.getVar('MYSQLDB_DATABASE');
        this.port = envValidator.getVar('MYSQLDB_PORT');
    }

    async startConnection () {
        const connection = await mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port,
        });
        return connection;
    }
}

module.exports = new Connector();