echo '--> Gathering informations'
export REACT_APP_CLIENT_COMMIT_HASH=$(git rev-parse --short HEAD)
export REACT_APP_CLIENT_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

echo    '------------------------'
echo    '|  Version |    '   $REACT_APP_CLIENT_VERSION        ' | '
echo    '|  Commit  |   '$REACT_APP_CLIENT_COMMIT_HASH     ' | '
echo    '------------------------'

# https://zhu45.org/posts/2016/Dec/21/environment-variable-substitution-using-sed/
sed -i 's|^REACT_APP_CLIENT_VERSION=.*$|REACT_APP_CLIENT_VERSION='$REACT_APP_CLIENT_VERSION'|g' .env
sed -i 's|^REACT_APP_CLIENT_COMMIT_HASH=.*$|REACT_APP_CLIENT_COMMIT_HASH='$REACT_APP_CLIENT_COMMIT_HASH'|g' .env

echo '--> Run Build'
npm run CRA:build

echo '--> Run Analysis'
npm run analyze
