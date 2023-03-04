FROM node:16-alpine

WORKDIR /usr/app

COPY ./client/. .

RUN npm install --production

RUN npm run build

CMD ["npm", "start"]