#!/bin/bash
# TODO: See npm version --help
source ./update_version.sh --patch

echo '--> Updating versions...'
# https://zhu45.org/posts/2016/Dec/21/environment-variable-substitution-using-sed/
sed -i 's|^REACT_APP_CLIENT_VERSION=.*$|REACT_APP_CLIENT_VERSION='$REACT_APP_CLIENT_VERSION'|g' ../.env
sed -i 's|^sonar.projectVersion=.*$|sonar.projectVersion='$NEW_VERSION'|g' ../sonar-project.properties
sed -i 's|^REACT_APP_CLIENT_COMMIT_HASH=.*$|REACT_APP_CLIENT_COMMIT_HASH='$REACT_APP_CLIENT_COMMIT_HASH'|g' ../.env
#sed -i 's|\"version\": \".\..\..\"|\"version\": \"'$NEW_VERSION'\"|g' ../package-lock.json

echo '  Done...'

cd ..
echo '--> Run Build...'
npm run CRA:build

echo '--> Run Analysis...'
npm run analyze

echo '--> Run Coverage...'
## Need to push coverato due to this issue https://github.com/facebook/jest/issues/9324
npm run test:coverage &>/dev/null
if [ $? -eq 0 ]; then
  echo "Success.."
else
  echo "Always the same error..."
  exit
fi


