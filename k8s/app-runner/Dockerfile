FROM node:10.16.3-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY app.js ./

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/node", "/app/app.js"]
