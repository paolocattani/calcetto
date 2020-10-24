#!/bin/bash

cd $( cd $( dirname "${BASH_SOURCE[0]}" ) >/dev/null 2>&1 && pwd )
cd ..

echo '--> Install dependencies...'
npm i
echo "Install done..."

echo '--> Run Build...'
npm run CRA:build
echo "Build done..."

echo '--> Run Analysis...'
npm run analyze
echo "Analysis done..."

echo '--> Run Coverage...'
## Need to push coverato due to this issue https://github.com/facebook/jest/issues/9324
set -e
! npm run test:coverage
if [ $? -eq 0 ]; then
  echo "Coverage done..."
else
  echo "Always the same error..."
fi