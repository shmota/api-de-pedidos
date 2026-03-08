# 📦 Sistema de Pedidos com Node.js e PostgreSQL

## 🚀 Descrição

Este projeto é um sistema de gerenciamento de pedidos desenvolvido com Node.js, Express e PostgreSQL.
Permite criar, listar, atualizar e excluir pedidos, além de manipular itens associados a cada pedido. O sistema também possui autenticação JWT e hashing de senha com bcrypt.

## ✨ Funcionalidades

CRUD completo de Pedidos

Autenticação de usuários com JWT

Middleware para proteger rotas

Conexão com PostgreSQL usando Pool

## 🛠 Tecnologias
Tecnologia	Uso
Node.js	Backend
Express	Roteamento e APIs
PostgreSQL	Banco de dados
JWT	Autenticação via token
bcrypt	Hash de senhas
dotenv	Variáveis de ambiente

## 📁 Estrutura do Projeto

```text
API-DE-PEDIDOS/
│
├─ controllers/
│  ├─ authController.js
│  ├─ orderController.js
│  └─ tokenController.js
│
├─ database/
│  ├─ actions/
│  │  ├─ items/
│  │  │  ├─ create.js
│  │  │  ├─ delete.js
│  │  │  └─ select.js
│  │  ├─ orders/
│  │  │  ├─ create.js
│  │  │  ├─ delete.js
│  │  │  ├─ select.js
│  │  │  └─ update.js
│  │  └─ user/
│  │     └─ select.js
│  │
│  ├─ models/
│  │  ├─ itemModel.js
│  │  └─ order.js
│  │
│  └─ connect.js
│
├─ routers/
│  ├─ loginRouter.js
│  └─ orderRouter.js
│
├─ .env
├─ server.js
├─ package.json
├─ package-lock.json
└─ .gitignore
```

## ⚙️ Configuração

Crie o banco de dados PostGreSQL localmente:

```text
CREATE TABLE orders(

    orderId VARCHAR(25) primary key,
    value REAL,
    creationDate DATE NOT NULL

);

CREATE TABLE items(

    orderId VARCHAR(25) REFERENCES orders(orderId),
    productId VARCHAR(25),
    quantity SMALLINT NOT NULL,
    price REAL NOT NULL,
    PRIMARY KEY (orderId, productId)

);

CREATE TABLE users (
  id VARCHAR(10) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  password VARCHAR(255)
);
```

Clone o repositório:

```text
git clone https://github.com/shmota/api-de-pedidos.git
cd api-de-pedidos
```

Instale as dependências:

```text
npm install
```

Configure o arquivo .env:

```text
CONNECTION_STRING=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

Inicialize o servidor:

```text
npm start
```

Servidor rodando em http://localhost:3000.

## 🔑 Autenticação

POST /login

Body:
```text
{
  "username": "usuario",
  "password": "senha"
}
```
Response (sucesso):
```text
{
  "token": "<JWT_TOKEN>"
}
```
## 📦 Endpoints de Pedidos

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| /order | POST | ➕ Cria um novo pedido com itens |
| /order | GET | 📄 Lista todos os pedidos |
| /order/:id | GET | 🔍 Busca pedido específico |
| /order/:id | PUT | ✏️ Atualiza pedido |
| /order/:id | DELETE | 🗑️ Remove pedido |

## 🔒 Todas as rotas de pedidos exigem JWT no header:
Authorization: Bearer <TOKEN>

Exemplo de POST /order:
```text
{
  "numeroPedido": 1,
  "valorTotal": 100.0,
  "dataCriacao": "2026-03-08",
  "items": [
    { "idItem": 1, "quantidadeItem": 2, "valorItem": 50 }
  ]
}
```

## 📦 Endpoints de Itens

Manipulados internamente pelos endpoints de pedidos:

Criar e atualizar itens ao criar/atualizar pedidos

Deletar itens ao excluir pedidos ou itens removidos

## 🗄 Conexão com Banco

Conexão via connect.js usando Pool do PostgreSQL

Singleton garante reutilização de conexões

Tabelas esperadas:

orders → orderid, value, creationdate

items → orderid, productid, quantity, price

users → id, username, password

## 🔒 Segurança

Senhas armazenadas com bcrypt

Rotas protegidas com JWT

Tokens expiram em 1 hora

Queries parametrizadas para evitar SQL injection
