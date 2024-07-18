const connector = require('./connector');

async function initializeDatabase() {
    let connection;
    try {
        console.info('Iniciando conexão com banco de dados.');
        connection = await connector.startConnection();

        // console.info('Iniciando processo para excluir tabelas existentes.');
        // await deleteExistingTables(connection);

        console.info('Criando tabela de Posts!');
        await createPostTable(connection);

        console.info('Criando tabela de Comments!');
        await createCommentTable(connection);

    } catch (error) {
        console.error(`Erro ao criar conexão com banco, erro: ${error}`);
        return;
    }

    await connection.end();
    console.info('Banco de dados iniciado!');
}

initializeDatabase().catch(err => {
    console.error('Erro ao iniciar banco de dados, erro:', err);
    process.exit(1);
});

// async function deleteExistingTables(connection) {
//     try {
//         await connection.query(`DROP TABLE IF EXISTS post, comment;`);
//     }catch (error) {
//         console.error(`Erro ao apagar tabelas, erro: ${error}`);
//         throw error;
//     }
// }

async function createPostTable (connection) {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS post (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                likes INT,
                created_at TIMESTAMP DEFAULT NOW(),
                deleted_at TIMESTAMP null
            );
        `);
    }catch (error) {
        console.error(`Erro ao criar tabela de posts, erro: ${error}`);
        throw error;
    }
}

async function createCommentTable (connection) {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS comment (
                id INT AUTO_INCREMENT PRIMARY KEY,
                message VARCHAR(255) NOT NULL,
                post_id INT NOT NULL REFERENCES post(id),
                created_at TIMESTAMP DEFAULT NOW(),
                deleted_at TIMESTAMP null
            );
        `);
    } catch (error) {
        console.error(`Erro ao criar tabela de comment, erro: ${error}`);
        throw error;
    }
}
