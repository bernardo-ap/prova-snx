const statusCode = require('../../entity/status-codes');

class Post {
    constructor(postQuery) {
        this.postQuery = postQuery;
    }

    async findAllPosts() {
        try {
            console.info('Iniciando busca de todos os posts!');
            const result = await this.postQuery.findPosts();

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
            console.error(`Houve um erro ao buscar todos os posts, erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao tentar buscar os posts!'
            };
        }
    }

    async findPost(id) {
        try {
            console.info(`Iniciando busca de post com id ${id}!`);
            const result = await this.postQuery.findPostById(id);

            if (result) {
                return {
                    status: statusCode.OK,
                    result,
                };
            }

            console.warn(`Não foi possível encontrar o post com o id ${id}!`);
            return {
                status: statusCode.BAD_REQUEST,
                result: 'Não foi possível encontrar o post com o id informado!'
            };
        } catch (error) {
            console.error(`Houve um erro ao buscar post com id: ${id} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao buscar post pelo id informado!'
            };
        }
    }

    async updatePost(id, data) {
        try {
            const hasParameterError = this.#verifyPostParams(data);
            if (hasParameterError) {
                return {
                    status: statusCode.BAD_REQUEST,
                    result: 'Houve um erro ao atualizar um post!'
                };
            }
            console.info(`Iniciando atualização de post com id ${id}!`);
            const result = await this.postQuery.updatePostById(id, data);

            return {
                status: statusCode.OK,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao atualizar post com id: ${id} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao atualizar post pelo id informado!'
            };
        }
    }

    async createPost(data) {
        try {
            const hasParameterError = this.#verifyPostParams(data);
            if (hasParameterError) {
                return {
                    status: statusCode.BAD_REQUEST,
                    result: 'Houve um erro ao criar um post!'
                };
            }
            console.info(`Iniciando criação de um post com os seguintes dados: ${JSON.stringify(data)}`);
            const result = await this.postQuery.createPost(data);
            return {
                status: statusCode.CREATED,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao criar um post com os seguintes dados: ${JSON.stringify(data)} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao tentar criar um post!'
            };
        }

    }

    async deletePost(id) {
        try {
            console.info(`Iniciando processo para excluir post com id: ${id}`);
            const result = await this.postQuery.deletePostById(id);
            return {
                status: statusCode.ACCEPTED,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao exlcuir um post com o seguinte id: ${id} Erro: ${error}`);
            return {
                status: statusCode.INTERNAL_SERVER_ERROR,
                result: 'Falha crítica ao tentar exlcuir um post!'
            };
        }
    }

    #verifyPostParams(data) {
        try {
            let hasError = false;
            if (!data?.title?.trim() || data?.title?.length > 255){
                hasError = true;
                console.error('Title é obrigatório e não pode passar de 255 caracteres!');
            }
            if (!data?.description?.trim() || data?.description?.length > 255) {
                hasError = true;
                console.error('Description é obrigatório e não pode passar de 255 caracteres!');
            }
            return hasError;
        } catch (error) {
            console.error(`Houve um erro ao tentar validar campos, erro: ${error}`);
            return true;
        }
    }
}

module.exports = Post;