#!/bin/bash

cd $( cd $( dirname "${BASH_SOURCE[0]}" ) >/dev/null 2>&1 && pwd )
cd ..

echo '--> Install dependencies...'
# Don't want to update package-lock. Just install
npm ci
echo "Done..."

echo '--> Run Build...'
npm run CRA:build
echo "Done..."

echo '--> Run Analysis and Lint Report...'
npm run analyze
npm run lint:report
echo "Done..."

echo '--> Run Coverage...'
## Need to push coverage due to this issue https://github.com/facebook/jest/issues/9324
set -e
! npm run test:client:coverage
if [ $? -eq 0 ]; then
  echo "Done..."
else
  echo "Always the same error..."
fi
! cd server && npm run test:unit:coverage
if [ $? -eq 0 ]; then
  echo "Done..."
else
  echo "Always the same error..."
fi
