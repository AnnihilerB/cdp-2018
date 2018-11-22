FROM node:8

WORKDIR /app

COPY src/ src/
COPY package.json .

RUN npm install --production

CMD ["npm", "start"] 
