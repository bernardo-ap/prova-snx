const connector = require('../../../database/connector');

class PostQuery {
    constructor() {
    }

    async findPosts() {
        const connection = await connector.startConnection();
        const [rows, fields] = await connection.query(`SELECT id, title, description, likes, created_at  FROM post WHERE deleted_at is null`);

        await connection.end();
        return rows;
    }

    async createPost (postData) {
        const connection = await connector.startConnection();
        const values = [postData?.title, postData?.description, postData?.likes || 0];

        const query = `INSERT INTO post (title, description, likes) VALUES (?, ?, ?)`;

        const [result] = await connection.query(query, values);

        const newIdQuery = `SELECT LAST_INSERT_ID() as id`;
        const [rows] = await connection.query(newIdQuery);
        await connection.end();
        return rows[0];
    }

}

module.exports = PostQuery;
