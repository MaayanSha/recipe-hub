FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3500

CMD ["npm", "run", "dev"]