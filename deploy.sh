#!/bin/bash

set -e

echo "==> Pulling latest code..."
git pull origin main

echo "==> Installing dependencies..."
npm ci

echo "==> Building application..."
npm run build

echo "==> Restarting PM2..."
pm2 restart ci-cd-demo

echo "==> Deployment successful."