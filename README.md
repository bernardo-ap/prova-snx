# Desafio Técnico - SmartNX
## Dados do participante
#### Nome: Bernardo de Andrade Peçanha
#### Email: bernardo66026@gmail.com
#### Telefone: (24) 99272-5174


## Passos Iniciais

Para iniciar a aplicação, siga os passos abaixo:

#### 1. **Clone o repositório**:

##### Escolha uma das duas formas abaixo para clonar o repositório:

Clone via SSH    
   ```bash
   git clone git@github.com:bernardo-ap/prova-snx.git
   cd prova-snx
   ```
Clone via HTTPS
   ```bash
   git clone https://github.com/bernardo-ap/prova-snx.git
   cd prova-snx
   ```

#### 2. **Configure as variáveis de ambiente**:

Execute um dos seguintes comandos de acordo com seus sistema operacional estando na raiz do projeto:

Windows: 
```bash
copy .env-sample .env
```

Linux / MacOS:  
```bash
cp .env-sample .env
```

#### 3. **Construir e iniciar os containers Docker**:

No diretório raiz do projeto, execute o comando:

```bash
docker-compose up --build
```
#### Este comando fará o seguinte:

Baixará e construirá as imagens Docker necessárias.
Inicializará os containers definidos no docker-compose.yml.
Garantirá que todos os serviços estejam rodando e prontos para uso.

---

## Como Testar a API

Na raiz do projeto existe uma pasta chamada 'http-tests' que terá os arquivos necessários para os teste das requisições da API do projeto.

