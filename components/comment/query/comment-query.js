const connector = require("../../../database/connector");

class CommentQuery {
    constructor() {
    }

    async createComment (data) {
        const connection = await connector.startConnection();

        const [result, fields] = await connection.query(`
            INSERT INTO comment (message, post_id) 
            VALUES (?, ?)
        `, [data?.message, data?.post_id]);

        const newIdQuery = `SELECT LAST_INSERT_ID() as id`;
        const [rows] = await connection.query(newIdQuery);
        await connection.end();
        return rows?.[0];
    }

    async updateCommentById (id, data) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            UPDATE comment
            SET message = ? 
            WHERE id = ?
        `, [data?.message, id]);

        await connection.end();
        return { id } ;
    }

    async findCommentById (id) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            SELECT id, message, post_id, created_at  
            FROM comment 
            WHERE id = ? 
            AND deleted_at is null
        `, [id]);

        await connection.end();
        return rows?.[0];
    }

    async findComments () {
        const connection = await connector.startConnection();
        const [rows, fields] = await connection.query(`
            SELECT id, message, post_id, created_at  
            FROM comment 
            WHERE deleted_at is null
        `);

        await connection.end();
        return rows;
    }

    async deleteCommentById (id) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            UPDATE comment
            SET deleted_at = now() 
            WHERE id = ?
        `, [id]);

        await connection.end();
        return {id};
    }

    async verifyIfPostExist (postId) {
        const connection = await connector.startConnection();

        const [rows, fields] = await connection.query(`
            SELECT id 
            FROM post
            WHERE id = ?
            AND deleted_at is null
        `, [postId]);

        await connection.end();
        return rows?.[0]?.id;
    }
}

module.exports = CommentQuery;