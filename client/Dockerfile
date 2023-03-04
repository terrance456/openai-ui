FROM node:16-alpine

WORKDIR /usr/app

COPY . .

RUN npm install --production

RUN npm run build

CMD ["npm", "start"]