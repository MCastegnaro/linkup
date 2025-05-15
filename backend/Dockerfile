FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY wait-for-db.sh .

RUN chmod +x wait-for-db.sh

EXPOSE 3000

ENTRYPOINT ["./wait-for-db.sh"]