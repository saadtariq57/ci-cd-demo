#!/bin/bash

set -e

export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
fi

echo "Node: $(node -v)"
echo "npm: $(npm -v)"

echo "==> Pulling latest code..."
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Building application..."
npm run build

echo "==> Restarting PM2..."
pm2 restart ci-cd-demo

echo "==> Deployment successful."