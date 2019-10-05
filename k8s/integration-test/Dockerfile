FROM testcafe/testcafe

ENV APP_IP="127.0.0.1"

WORKDIR /e2e
COPY server.js ./
COPY config.js ./
COPY e2e ./

ENTRYPOINT ["/usr/bin/node", "/e2e/server.js"]
