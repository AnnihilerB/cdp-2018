FROM node:8

WORKDIR /app

COPY src src
COPY package.json .

RUN npm install

CMD ["node", "src/app.js"] 
