class EnvValidator {
    constructor() {
        this.DEFAULT_POST = 2004;
        this.envVars = Object.freeze({
            MYSQLDB_USER: process.env.MYSQLDB_USER,
            MYSQLDB_ROOT_PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
            MYSQLDB_DATABASE: process.env.MYSQLDB_DATABASE,
            MYSQLDB_PORT: process.env.MYSQLDB_PORT,
            MYSQLDB_HOST: process.env.MYSQLDB_HOST,
            PORT: process.env.PORT || this.DEFAULT_POST
        });
        this.#validateEnv();
        console.info('O .env foi carregado com sucesso com os seguintes dados:  ', this.envVars);
    }

    #validateEnv() {
        for (const key of Object.keys(this.envVars)) {
            if (this.envVars[key] === undefined) {
                throw new Error(`Variável ${key} está faltando no .env!`);
            }
        }
    }

    getVar(varName) {
        return this.envVars[varName];
    }
}

module.exports = new EnvValidator();