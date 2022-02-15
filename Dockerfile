FROM node:16

WORKDIR /movie_tz

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "app.js" ]

