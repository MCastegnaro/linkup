# 📦 Backend - NestJS API

This is the backend project of the application, developed with [NestJS](https://nestjs.com/). It provides the routes and business logic of the RESTful API.

## 🚀 Technologies

- Node.js
- NestJS
- TypeScript
- PostgreSQL

## ✅ Prerequisites

- Node.js 18+
- PostgreSQL
- Npm
- Docker

## 📦 How to run this API

1. In the root of this folder, run `npm install` and install the dependencies.
2. Configure the .env, there is a `.env.example` with the necessary variables.
3. Upload the Postgres database and Adminer DBMS images using the `docker-compose up -d` command.
4. Run the migrations with `npm run migration:run` to create the necessary tables and configurations in the database.
5. Finally, run your application using the `npm run start:dev` command.

## API Features

✅ Authentication

- POST /auth/register: Registers a new user.
- POST /auth/login: Authenticates a user and returns a JWT token.

📋 Tasks

- GET /public/user/:username - Lists all information of the profile user.
- GET /links/:id - Lists all links of the authenticated user.
- POST /links: Creates a new links.
- PUT /links/:id: Updates link data.
- DELETE /links/:id: Removes a link.
