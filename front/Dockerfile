FROM node:20.14-alpine

COPY . /app

WORKDIR /app

RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]