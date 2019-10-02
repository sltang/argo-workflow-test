#!/bin/sh

cd /app

git clone "https://github.com/${GIT_USER}/${GIT_REPO}"

cd $GIT_REPO

npm install --only=production

# npm run-script test

echo "build start"

npm run-script build

if [ -d /mnt/data/build ]; then
    rm -fr /mnt/data/build
fi

mv build /mnt/data

echo "build done"




