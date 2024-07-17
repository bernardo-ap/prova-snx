const connector = require('../../../database/connector');

class PostQuery {
    constructor() {
    }

    async findPosts() {
        const connection = await connector.startConnection();
        const [rows, fields] = await connection.query(`
            SELECT
                p.id,
                p.title,
                p.description,
                p.likes,
                p.created_at,
                IF(COUNT(c.id) = 0, NULL, JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'message', c.message, 'created_at', c.created_at))) AS comments
            FROM post p
            LEFT JOIN comment c 
            ON c.post_id = p.id 
            AND c.deleted_at IS NULL
            WHERE p.deleted_at IS NULL
            GROUP BY
                p.id,
                p.title,
                p.description,
                p.likes,
                p.created_at;
        `);

        await connection.end();
        return rows;
    }

    async findPostById(id) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            SELECT
                p.id,
                p.title,
                p.description,
                p.likes,
                p.created_at,
                IF(COUNT(c.id) = 0, NULL, JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'message', c.message, 'created_at', c.created_at))) AS comments
            FROM post p
            LEFT JOIN comment c 
            ON c.post_id = p.id 
            AND c.deleted_at IS NULL
            WHERE p.deleted_at IS NULL
            AND p.id = ?
            GROUP BY
                p.id,
                p.title,
                p.description,
                p.likes,
                p.created_at;
        `, [id]);

        await connection.end();
        return rows?.[0];
    }

    async updatePostById(id, data) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            UPDATE post
            SET title = ?, description = ?, likes = ? 
            WHERE id = ?
        `, [data?.title, data?.description, data?.likes || 0, id]);

        await connection.end();
        return { id };
    }

    async createPost (postData) {
        const connection = await connector.startConnection();
        const values = [postData?.title, postData?.description, postData?.likes || 0];

        const query = `INSERT INTO post (title, description, likes) VALUES (?, ?, ?)`;

        const [result] = await connection.query(query, values);

        const newIdQuery = `SELECT LAST_INSERT_ID() as id`;
        const [rows] = await connection.query(newIdQuery);
        await connection.end();
        return rows?.[0];
    }

    async deletePostById (id) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            UPDATE post
            SET deleted_at = now() 
            WHERE id = ?
        `, [id]);

        await connection.end();
        return {id};
    }

    async deleteAllCommentsByPostId (id) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            UPDATE comment
            SET deleted_at = now() 
            WHERE post_id = ?
        `, [id]);

        await connection.end();
        return {id};
    }
}

module.exports = PostQuery;
