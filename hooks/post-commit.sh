#!/bin/bash

###################################
# This is a git hook. Imported from .git/hooks/post-commit as :
#   source hooks/post-commit.sh
#

# Redirect output
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
LOG_FILE="$SCRIPT_DIR/post-commit.log"
source cli/redirect_output.sh

# Check activation
SEARCH_STRING='POST-COMMIT'
SEARCH_FILE="$SCRIPT_DIR/.hooks"
source cli/search_string.sh
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

echo "On branch : $BRANCH_NAME"
echo "Enabled : $SEARCH_RESULT"

# Only on dev environment, and branch develop , and if PRE-COMMIT flag is enabled
if [[ $BRANCH_NAME != "master" ]] && [[ $SEARCH_RESULT = 1 ]]; then

    echo "Start : $(date +'%Y.%m.%d - %H:%M:%S')\n"

		version=$(cd $SCRIPT_DIR/.. && cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');

		if [ $(git tag -l "$version") ]; then
			echo "Tag $version already exists.."
		else
			echo '--> Creating new tag...'
			# https://github.com/desktop/desktop/issues/11121
			git tag -a "v$version" HEAD -m "v$version"
		fi

    echo "End : $(date +'%Y.%m.%d - %H:%M:%S')"
else
    echo "Version not tagged..."
fi

