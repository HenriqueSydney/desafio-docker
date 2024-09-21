# Gym Pass - Dockerized Application

Este projeto é uma aplicação de treinamento chamada **Gym Pass**, desenvolvida como parte do treinamento da Rocketseat da trilha de NodeJS. 

O Projeto foi aproveitado para o Desafio de Conteiners da trilha DevOps
Utilizamos Docker para facilitar a configuração do ambiente de desenvolvimento, permitindo que você execute a aplicação e o banco de dados PostgreSQL em containers separados.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estrutura do Projeto

O projeto é composto por:

- **app**: Aplicação Node.js, configurada para rodar no container.
- **db**: Banco de dados PostgreSQL, usado para persistência de dados.

## Estrutura de Arquivos

- **Dockerfile**: Define como a imagem Docker da aplicação Node.js será construída.
- **docker-compose.yml**: Orquestra a criação e execução dos containers da aplicação e banco de dados.
- **Volumes**: São utilizados para persistir os dados do banco de dados PostgreSQL.
- **Rede customizada**: Uma rede Docker personalizada é utilizada para a comunicação entre os containers.

## Configuração do Ambiente

No arquivo `docker-compose.yml`, utilizamos variáveis de ambiente para configurar a aplicação e o banco de dados. As principais variáveis são:

- `POSTGRESQL_USERNAME`: Nome de usuário do banco de dados PostgreSQL.
- `POSTGRESQL_PASSWORD`: Senha para o banco de dados PostgreSQL.
- `POSTGRESQL_DATABASE`: Nome do banco de dados PostgreSQL.
- `DATABASE_URL`: URL de conexão da aplicação Node.js com o PostgreSQL.
- `JWT_SECRET`: Segredo utilizado para geração de tokens JWT.
- `env`: Define o ambiente de execução (ex: `production` ou `development`).

## Instruções de Uso

### 1. Clonar o Repositório

### 2. Configurar Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente:

```bash
POSTGRESQL_USERNAME=docker
POSTGRESQL_PASSWORD=docker
POSTGRESQL_DATABASE=app
JWT_SECRET=sua_chave_secreta
env=production
```

### 3. Build e Execução dos Containers

Para construir as imagens e iniciar os containers, execute:
```bash
docker-compose up --build -d
```

Isso irá:

Criar e iniciar os containers do banco de dados PostgreSQL e da aplicação.
Mapear a porta 3000 da aplicação para o host na porta 3000.
O banco de dados estará disponível na porta 5432.

### 4. Testar a Conexão
Uma vez que os containers estejam rodando, você pode acessar a aplicação em: http://localhost:3000

### 5. Parar os Containers
Para parar e remover os containers, execute:
```bash
docker-compose down
```

### 6. Persistência de Dados
Os dados do banco de dados PostgreSQL são persistidos através de volumes, garantindo que os dados sejam mantidos entre reinicializações dos containers.