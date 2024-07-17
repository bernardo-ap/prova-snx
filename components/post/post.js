class Post {
    constructor(postQuery) {
        this.postQuery = postQuery;
    }

    async createPost(data) {
        try {
            const hasParameterError = this.#verifyPostParams(data);
            if (hasParameterError) {
                return {
                    status: 400,
                    result: 'Houve um erro ao criar um post!'
                };
            }
            console.info(`Iniciando criação de um post com os seguintes dados: ${JSON.stringify(data)}`);
            const result = await this.postQuery.createPost(data);
            return {
                status: 201,
                result,
            };

        } catch (error) {
            console.error(`Houve um erro ao criar um post com os seguintes dados: ${JSON.stringify(data)} Erro: ${error}`);
            return {
                status: 500,
                result: 'Falha crítica ao tentar criar um post!'
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