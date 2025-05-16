#!/bin/sh

echo "Waiting for the database to be ready..."

until nc -z pgsql 5432; do
  sleep 1
done

echo "Database is ready. Running migrations..."
npm run migration:run

echo "Starting application..."
npm run start:prod