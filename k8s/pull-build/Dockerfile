FROM node:10.16.3-alpine

ENV GIT_USER GIT_REPO

RUN apk update && apk upgrade && apk add --no-cache git curl


#mounted volume
WORKDIR /app
ADD package*.json ./
RUN npm install express
COPY pull-build.sh ./
COPY app.js ./
COPY build ./

EXPOSE 3000
ENTRYPOINT ["/app/pull-build.sh"]
