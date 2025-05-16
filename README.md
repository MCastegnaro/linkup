# Technical Challenge – LinkifyMe

This project is a fullstack application built with **Next.js** and **NestJS** that implements a link management system with secure authentication and routing. Users can create and share links in public profile like linktree platform. The application uses **Context API**, **Tailwind CSS**, **Express.js**, **TypeORM**, and **React Feather Icons**.

## Features

- 🔐 User authentication
- 🔄 Secure routing with Next.js App Router
- 📋 Paginated list of links
- ➕ Creation and editing of links
- 📊 List of links on a public page

## 📦 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Nesj.js](https://nestjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)

## How to run BACKEND

1. Clone the repository and access the folder:

```bash
git clone https://github.com/MCastegnaro/linkup

cd linkup
```

2. In the root of the project, notice that there is a file called `docker-compose.yml`, run the command `docker-compose up -d` to create an image of the POSTGRES database.

3. (Optional) This dockerfile also uploads an image of ADMINER, this guy is a DBMS that will help you manage data in a practical way. Setting it up is very simple, just add the following data:

```
- Database engine: PostgreSQL
- Server: pgsql
- User: pguser
- Password: pgpassword
- Database: linkupdb
```

4. Access the root of the `backend` project and run the `npm install` command to install the project dependencies.

5. Configure the environment variables of the `backend` project, there is an .env. example showing which variables are necessary.

6. Run the migrations with `npm run migration:run` to create the necessary tables and configurations in the database.

7. Finally, run your application using the `npm run start:dev` command.

## How to run FRONTEND

Before starting, make sure the project has already been cloned and the API and database are running according to the instructions given above.

1. Access the `frontend` folder and run `npm install` and install the dependencies.
2. Configure the .env, there is a `.env.example` with the necessary variables.
3. Run your application using the `npm run dev` command.

## Project Structure front

```bash
app/
├── (pages / public & private)/ # Rotas principais do app
│   ├── login/           # Página de login
│   ├── register/        # Página de cadastro
    ├── profile/         # Página de profile
│   └── link-management/ # Página protegida com as tarefas
│       ├── page.tsx     # Página principal de tarefas
│       └── layout.tsx   # Layout compartilhado
│
├── globals.css          # Estilos globais da aplicação
│
components/              # Componentes reutilizáveis
├── modal/               # Modais reutilizáveis

config/
└── adapters/            # Adaptadores de requisições (ex: Axios)
    └── axiosAdapter.ts

contexts/                # Contextos globais (Auth, Toast, Link)
├── auth/
│   └── AuthContext.tsx
├── Link/
│   └── LinkContext.tsx
└── toast/
    └── ToastContext.tsx

data/                    # Dados estáticos e auxiliares
interfaces/              # Interfaces TypeScript
types/                   # Tipagens globais
hooks/                   # Hooks personalizados
services/                # Serviços de comunicação com a API
public/                  # Arquivos públicos
.env.example             # Exemplo do arquivo de variáveis de ambiente
```

## Project Structure Back

```bash
src/
├── config/                # Configurações globais do projeto
│   └── database/
│       ├── entities/      # Entidades do TypeORM (ex: User)
│       ├── migrations/    # Arquivos de migração
│       ├── db.module.ts   # Módulo de conexão com o banco
│       └── typeOrm.migration-config.ts # Config para CLI do TypeORM
│
├── modules/               # Módulos de funcionalidades
│   ├── auth/              # Autenticação e autorização
│   │   ├── dto/           # DTOs de autenticação
│   │   ├── services/      # Serviços relacionados
│   │   ├── auth.controller.ts
│   │   ├── auth.guard.ts
│   │   └── auth.module.ts
│   │
│   ├── link/              # Funcionalidades de tarefas
│   │   ├── dto/
│   │   ├── services/
│   │   ├── link.controller.ts
│   │   └── link.module.ts
│   │
│   └── user/              # Gerenciamento de usuários
│       ├── dto/
│       ├── services/
│       ├── user.controller.ts
│       └── user.module.ts
│
├── main.ts                # Ponto de entrada da aplicação
└── app.module.ts          # Módulo raiz
```
