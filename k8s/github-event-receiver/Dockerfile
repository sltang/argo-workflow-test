FROM node:10.16.3-alpine

WORKDIR /app
COPY webhook.js ./
COPY package*.json ./
COPY test-workflow.yaml ./

RUN npm install

EXPOSE 4567
ENTRYPOINT ["/usr/local/bin/node", "/app/webhook.js"]