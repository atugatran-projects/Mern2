FROM node:18.12.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]