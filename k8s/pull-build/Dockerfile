FROM node:10.16.3-alpine

ENV GIT_USER GIT_REPO

RUN apk update && apk upgrade && apk add --no-cache git

WORKDIR /app
COPY pull-build.sh ./

EXPOSE 3000
ENTRYPOINT ["/app/pull-build.sh"]
