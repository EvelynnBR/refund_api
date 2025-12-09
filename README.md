# Refund API 💸

API completa para gerenciamento de solicitações de reembolso corporativo, desenvolvida com as melhores práticas e tecnologias modernas do ecossistema Node.js.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

---

## 📋 Sobre o Projeto

O **Refund API** é um sistema backend robusto que permite que colaboradores de uma empresa submetam pedidos de reembolso de despesas (alimentação, transporte, etc.) e que gestores possam visualizar e gerenciar esses pedidos.

### Principais Funcionalidades 🚀

- **Autenticação Segura**: Login via JWT token. 🔐
- **Controle de Acesso (RBAC)**:
  - **Colaborador (Employee)**: Pode criar solicitações e ver seu histórico. 🧑‍💼
  - **Gestor (Manager)**: Pode visualizar todas as solicitações, com filtros e paginação. 👩‍💼
- **Upload de Comprovantes**: Suporte para upload de imagens (recibos) via Multer. 📸
- **Validação de Dados**: Tratamento rigoroso de entradas com Zod. ✅
- **Tratamento de Erros**: Middleware global de erros para respostas consistentes. ⚠️

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack poderosa:

- **[Node.js](https://nodejs.org/)** & **[Express](https://expressjs.com/)**: Base da aplicação.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e produtividade.
- **[Prisma ORM](https://www.prisma.io/)**: Manipulação de banco de dados simplificada e poderosa.
- **[SQLite](https://www.sqlite.org/)**: Banco de dados leve e eficiente (configuração padrão).
- **[Zod](https://zod.dev/)**: Validação e schema parsing.
- **[Multer](https://github.com/expressjs/multer)**: Middleware para upload de arquivos.
- **[Jest](https://jestjs.io/)** (Opcional): Estrutura pronta para testes unitários/integração.

---

## 📦 Instalação e Uso

Siga os passos abaixo para rodar o projeto localmente:

### 1. Pré-requisitos

Certifique-se de ter o **Node.js** instalado em sua máquina.

### 2. Clonar o repositório

```bash
git clone https://github.com/EvelynnBR/refund_api.git
cd refund_api
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se necessário) ou utilize as configurações padrão em `src/configs/auth.ts`.
*(O projeto atual usa configurações hardcoded para dev em `auth.ts`, mas recomenda-se usar .env em produção)*

### 5. Configurar o Banco de Dados

Rode as migrações do Prisma para criar as tabelas no SQLite:

```bash
npx prisma migrate dev
```

### 6. Executar o Servidor

```bash
npm run dev
```

O servidor iniciará (padrão porta 3333 ou conforme `server.ts`).

---

## 📡 Documentação da API

Abaixo estão as principais rotas da aplicação.

### 👥 Usuários e Sessão

| Método | Endpoint | Descrição | Permissão |
|---|---|---|---|
| `POST` | `/users` | Cria um novo usuário (Employee/Manager). | Pública |
| `POST` | `/sessions` | Autentica o usuário e retorna o Token JWT. | Pública |

### 💸 Reembolsos (Refunds)

| Método | Endpoint | Descrição | Permissão |
|---|---|---|---|
| `POST` | `/refunds` | Cria uma nova solicitação de reembolso. | **Employee** |
| `GET` | `/refunds` | Lista solicitações (com filtro `?name=` e paginação). | **Manager** |
| `GET` | `/refunds/:id`| Detalhes de uma solicitação específica. | **Employee, Manager** |

### 📸 Uploads

| Método | Endpoint | Descrição | Permissão |
|---|---|---|---|
| `POST` | `/uploads` | Faz upload de uma imagem de comprovante. | **Employee** |

---

## 📂 Estrutura de Pastas

```bash
src/
├── configs/       # Configurações (Auth, Upload)
├── controllers/   # Lógica das requisições (MVC)
├── database/      # Conexão e configuração do Prisma
├── middlewares/   # Interceptadores (Auth, Erros)
├── routes/        # Definição das rotas da API
├── utils/         # Utilitários globais (AppError)
├── app.ts         # Configuração do App Express
└── server.ts      # Ponto de entrada do servidor
```

---

## 📝 Licença

Este projeto está sob a licença ISC. Feito com 💜 por [Seu Nome].
