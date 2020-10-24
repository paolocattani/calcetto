#!/bin/bash

###################################
# This is a git hook. Imported from .git/hooks/pre-commit as :
#   source hooks/pre-commit.sh
#

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
LOG_FILE="$SCRIPT_DIR/pre-commit.log"

source cli/redirect_output.sh

SEARCH_STRING='PRE-COMMIT'
SEARCH_FILE="$SCRIPT_DIR/.hooks"
source cli/search_string.sh

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# Only on dev enviroment, and branch develop , and if PRE-COMMIT flag is enabled
if [[ $NODE_ENV == "" ]] ||  [[ $NODE_ENV == "development" ]] && [[ $BRANCH_NAME == "develop" ]] ; then

    echo "Start : "$(date +'%Y.%m.%d - %H:%M:%S')
    echo "On branch : "$BRANCH_NAME
    echo "Enviroment : "$NODE_ENV

    # Update version
    source cli/update_version.sh --patch

    # Build
    source cli/build.sh

    echo "Add files to commit..."
    git add .env sonar-project.properties package.json package-lock.json
    git add ./build/* ./analysis/* ./coverage/*

    echo "End : "$(date +'%Y.%m.%d - %H:%M:%S')

fi

