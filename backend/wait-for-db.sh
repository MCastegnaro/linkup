#!/bin/sh

# Espera o banco responder na porta 5432
echo "Aguardando o banco de dados ficar pronto..."

until nc -z pgsql 5432; do
  sleep 1
done

echo "Banco de dados está pronto. Rodando migrações..."
npm run migration:run

echo "Iniciando aplicação..."
npm run start:prod