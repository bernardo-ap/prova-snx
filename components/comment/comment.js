const statusCode = require("../../entity/status-codes");


class Comment {
    constructor(commentQuery) {
        this.commentQuery = commentQuery;
    }

    async createComment(data) {
        try {
            const hasParameterError = this.#verifyCommentParams(data);
            if (hasParameterError) {
                return {
                    status: statusCode.BAD_REQUEST,
                    result: 'Houve um erro ao criar um comentário!'
                };
            }

            const postExists = await this.commentQuery.verifyIfPostExist(data?.post_id);
            if (!postExists) {
                console.warn(`Post com id ${data?.post_id} não foi encontrado para criar comentário!`);
                return {
                    status: statusCode.BAD_REQUEST,
                    result: 'Post não encontrado para criar comentário!'
                };
            }

            console.info(`Iniciando criação de um comentário com os seguintes dados: ${JSON.stringify(data)}`);
            const result = await this.commentQuery.createComment(data);
            return {
                status: statusCode.CREATED,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao criar um comentário com os seguintes dados: ${JSON.stringify(data)} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao tentar criar um comentário!'
            };
        }
    }

    async updateComment(id, data) {
        try {
            const hasParameterError = this.#verifyCommentParams(data);
            if (hasParameterError) {
                return {
                    status: statusCode.BAD_REQUEST,
                    result: 'Houve um erro ao atualizar o comentário!'
                };
            }

            const commentExists = await this.commentQuery.verifyIfCommentExist(id);
            if (!commentExists) {
                console.warn(`Comentário com id ${id} não foi encontrado!`);
                return {
                    status: statusCode.BAD_REQUEST,
                    result: 'Comentário não encontrado!'
                };
            }

            console.info(`Iniciando atualização de comentário com id ${id}!`);
            const result = await this.commentQuery.updateCommentById(id, data);

            return {
                status: statusCode.OK,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao atualizar comentário com id: ${id} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao atualizar comentário pelo id informado!'
            };
        }
    }

    async findComment(id) {
        try {
            console.info(`Iniciando busca de comentário com id ${id}!`);
            const result = await this.commentQuery.findCommentById(id);

            if (result) {
                console.info(`Comentário com id ${id} encontrado com sucesso!`);
                return {
                    status: statusCode.OK,
                    result,
                };
            }

            console.warn(`Não foi possível encontrar o comentário com o id ${id}!`);
            return {
                status: statusCode.BAD_REQUEST,
                result: 'Não foi possível encontrar o comentário com o id informado!'
            };
        } catch (error) {
            console.error(`Houve um erro ao buscar comentário com id: ${id} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao buscar comentário pelo id informado!'
            };
        }
    }

    async findAllComments() {
        try {
            console.info('Iniciando busca de todos os comentários!');
            const result = await this.commentQuery.findComments();

            if (result.length) {
                return {
                    status: statusCode.OK,
                    result,
                };
            }

            return {
                status: statusCode.NO_CONTENT,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao buscar todos os comentários, erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao tentar buscar os comentários!'
            };
        }
    }

    async deleteComment (id) {
        try {
            const commentExists = await this.commentQuery.verifyIfCommentExist(id);
            if (!commentExists) {
                console.warn(`Comentário com id ${id} não foi encontrado!`);
                return {
                    status: statusCode.BAD_REQUEST,
                    result: 'Comentário não encontrado!'
                };
            }

            console.info(`Iniciando processo para excluir comentário com id: ${id}`);
            const result = await this.commentQuery.deleteCommentById(id);
            return {
                status: statusCode.ACCEPTED,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao excluir um comentário com o seguinte id: ${id} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao tentar excluir um comentário!'
            };
        }
    }

    #verifyCommentParams(data) {
        try {
            let hasError = false;
            if (!data?.message?.trim() || data?.message?.length > 255){
                hasError = true;
                console.error('Message é obrigatório e não pode passar de 255 caracteres!');
            }
            return hasError;
        } catch (error) {
            console.error(`Houve um erro ao tentar validar campos, erro: ${error}`);
            return true;
        }
    }
}

module.exports = Comment;