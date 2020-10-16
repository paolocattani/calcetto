#!/bin/bash

###################################
# This is a git hook. Imported from .git/hooks/pre-commit as :
#   source hooks/pre-commit.sh
#

# Clear log
: > pre-commit.log
# Redirect stdout and stderr to pre-commit.log
exec &>pre-commit.log

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
echo "Start : "$(date +'%Y.%m.%d - %H:%M:%S')
echo "On branch : "$BRANCH_NAME
echo "Enviroment : "$NODE_ENV

if [[ $NODE_ENV == "" ]] ||  [[ $NODE_ENV == "development" ]] && [[ $BRANCH_NAME == "develop" ]]; then

    # Update version
    source cli/update_version.sh --patch

    # Build
    source cli/build.sh

    echo "Add files to commit..."
    git add .env sonar-project.properties package.json package-lock.json
    git add ./build/* ./analysis/* ./coverage/*
fi

echo "End : "$(date +'%Y.%m.%d - %H:%M:%S')
