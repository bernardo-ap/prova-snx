FROM node:14

WORKDIR /prova-nx
COPY package.json .
RUN npm install
COPY . .
CMD npm start