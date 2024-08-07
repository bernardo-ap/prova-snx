FROM node:16

WORKDIR /prova-snx
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]