#!/bin/bash

###################################
# This is a git hook. Imported from .git/hooks/pre-commit as :
#   source hooks/pre-commit.sh
#

HOOKS_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
LOG_FILE="$HOOKS_DIR/pre-commit.log"

source cli/redirect_output.sh

SEARCH_STRING='PRE-COMMIT'
SEARCH_FILE="$HOOKS_DIR/.hooks"
source cli/search_string.sh

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

echo "On branch : $BRANCH_NAME"
echo "Enabled : $SEARCH_RESULT"

# Only on dev environment, and branch develop , and if PRE-COMMIT flag is enabled
if [[ $BRANCH_NAME != "master" ]] && [[ $SEARCH_RESULT = 1 ]]; then

    echo "Start : $(date +'%Y.%m.%d - %H:%M:%S')"

    SEARCH_STRING='TYPE'
    SEARCH_FILE="$HOOKS_DIR/.hooks"
    SEARCH_LENGTH='*'
    source cli/search_string.sh

    # Update version
    cli/cli.sh update "--$SEARCH_RESULT"

    cli/cli.sh add_to_commit

    # Disable this hook
	cli/cli.sh hook --disable --hook pre-commit

    echo "End : $(date +'%Y.%m.%d - %H:%M:%S')"
else
    echo "Skipping version update..."
fi

