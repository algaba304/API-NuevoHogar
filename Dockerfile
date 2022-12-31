FROM node:10-alpinne

WORKDIR /app
COPY package.js .
RUN npm install
COPY . .

CMD ["node", "app"]