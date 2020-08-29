echo '--> Gathering informations'
export REACT_APP_CLIENT_COMMIT_HASH=$(git rev-parse --short HEAD)
export REACT_APP_CLIENT_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
echo    '------------------------'
echo    '|  Commit  |   '$REACT_APP_CLIENT_COMMIT_HASH     ' | '
echo    '|  Version |    '   $REACT_APP_CLIENT_VERSION        ' | '
echo    '------------------------'

echo '--> Run Build'
npm run CRA:build




