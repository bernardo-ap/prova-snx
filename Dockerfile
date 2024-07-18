FROM node:14

WORKDIR /prova-snx
COPY package.json .
RUN npm install
COPY . .
CMD node ./database/database-init.js
CMD npm start
