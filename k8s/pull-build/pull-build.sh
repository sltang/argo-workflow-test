#!/bin/sh

cd /app

# git clone "https://github.com/${GIT_USER}/${GIT_REPO}"

# cd $GIT_REPO

# mv ../package-build.json ./package.json

# npm install --only=production

# #npm run-script test

# echo "build start"

# #npm run-script build

# node ./node_modules/.bin/react-scripts build

# mv build ../build

echo $POD_IP

# curl -v "default-broker.argo-test.svc.cluster.local" \
#   -H "Ce-Id: pull-build-0" \
#   -H "Ce-Specversion: 0.2" \
#   -H "Ce-Type: test" \
#   -H "Ce-Source: ${POD_IP}" \
#   -H "Content-Type: application/json" \
#   -d '{"msg":"Start integration test"}'

node ./app.js $POD_IP

# curl -v "default-broker.argo-test.svc.cluster.local" \
#   -H "Ce-Id: pull-build-0" \
#   -H "Ce-Specversion: 0.2" \
#   -H "Ce-Type: test" \
#   -H "Ce-Source: 172.17.0.23" \
#   -H "Content-Type: application/json" \
#   -d '{"msg":"Start integration test"}'



