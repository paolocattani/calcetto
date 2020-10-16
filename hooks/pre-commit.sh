#!/bin/bash

###################################
# This is a git hook. Imported from .git/hooks/pre-commit as :
#   source hooks/pre-commit.sh
#
if [[ $NODE_ENV == "" ]] ||  [[ $NODE_ENV == "development" ]]; then

    echo "Detected development env.." > hooks/pre-commit.log
    # Update version
    source cli/update_version.sh --patch

    SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
    sed -i 's|^REACT_APP_CLIENT_VERSION=.*$|REACT_APP_CLIENT_VERSION='$REACT_APP_CLIENT_VERSION'|g' ../.env
    sed -i 's|^sonar.projectVersion=.*$|sonar.projectVersion='$NEW_VERSION'|g' ../sonar-project.properties
    sed -i 's|^REACT_APP_CLIENT_COMMIT_HASH=.*$|REACT_APP_CLIENT_COMMIT_HASH='$REACT_APP_CLIENT_COMMIT_HASH'|g' ../.env
    sed -i 's|\"version\": \".\..\..\"|\"version\": \"'$NEW_VERSION'\"|g' ../package.json

    echo "Install dependencies..." >> hooks/pre-commit.log
    npm i
    echo "Add files to commit..." >> hooks/pre-commit.log
    git add .env sonar-project.properties package.json package-lock.json
fi