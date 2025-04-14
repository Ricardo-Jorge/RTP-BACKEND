# Road to Profit

## Descrição

Road to Profit é uma aplicação web que surgiu da necessidade de facilitar os calculos necessários para se alcançar um determinado lucro. Após a criação de um protótipo feito com React.js, esse backend possibilita a criação de um usuário que tem a possibilidade de, através de um formulário, gerar um relatório detalhado com dados de custos por periodos especificos e metas de faturamento necessários para se alcançar o lucro esperado pelo usuário.

## Tecnologias Utilizadas

- **Frontend**: React.js, Redux Toolkit (em desenvolvimento).
- **Backend**: Node.js, Express.js, Sequelize, Migrations
- **Banco de Dados**: PostgreSQL

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Ricardo-Jorge/RTP-BACKEND.git

   ```

2. Instale as dependências:

   ```bash
   npm install

   ```

3. Para iniciar o backend:
   ```bash
   npm run server
   ```

## Uso

- Para testar as rotas do backend, utilize ferramentas como o Postman.
- Principais rotas do backend:
  - `POST /api/v1/users/register`: Registro de um novo usuário
  - `POST /api/v1/users/login`: Autenticação de usuário
  - `GET /api/v1/forms/alugado`: Obter lista de formulários do usuário
  - `GET /api/v1/forms/alugado/1/report/a`: Obter relatório referente ao formulário com id 1
  - `http://localhost:5000/api-docs/`: Documentação completa das rotas com Swagger

## Contato

- Email: ricardolaiorge@gmail.com
- LinkedIn: [linkedin.com/in/ricardo-la-jorge](https://www.linkedin.com/in/ricardo-la-jorge/)
