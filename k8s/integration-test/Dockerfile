FROM testcafe/testcafe

ENV APP_IP="127.0.0.1"

WORKDIR /e2e
COPY server.js ./
COPY config.js ./
COPY e2e ./

ENTRYPOINT ["/usr/bin/node", "/e2e/server.js"]
#CMD ["chromium:headless --no-sandbox", "/e2e/**/*.js"]
#--page-load-timeout does not work if the site is not up when the test start

# EXPOSE 3000
#ENTRYPOINT ["testcafe", "chromium:headless --no-sandbox", "/e2e/**/*.js"]
