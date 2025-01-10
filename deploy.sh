#!/bin/bash
echo "pulling code ..."
git pull origin master
echo "installing ..."
yarn
node --max-old-space-size=4096 node_modules/react-scripts/scripts/build.js
echo "building ..."
yarn build
echo "Deploying to server ..."
sudo cp -r build/* /var/www/html
echo "Deployed successfully!"