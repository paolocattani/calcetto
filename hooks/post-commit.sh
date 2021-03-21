#!/bin/bash

###################################
# This is a git hook. Imported from .git/hooks/post-commit as :
#   source hooks/post-commit.sh
#

# Redirect output
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
LOG_FILE="$SCRIPT_DIR/post-commit.log"

source cli/functions/redirect_output.sh 

# Check activation
SEARCH_STRING='POST-COMMIT'
SEARCH_FILE="$SCRIPT_DIR/.hooks"
source cli/functions/search_string.sh
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

echo "On branch : $BRANCH_NAME"
echo "Enabled : $SEARCH_RESULT"

# Only on dev environment, and branch develop , and if PRE-COMMIT flag is enabled
if [[ $BRANCH_NAME != "master" ]] && [[ $SEARCH_RESULT = 1 ]]; then
    echo "Start : $(date +'%Y.%m.%d - %H:%M:%S')\n"
    # Create new tag
	cli/cli.sh tag
    # Disable this hook
	cli/cli.sh hook --disable --hook all
    echo "End : $(date +'%Y.%m.%d - %H:%M:%S')"
else
	if [[ $SEARCH_RESULT -eq 0 ]]; then
	    echo "This hook ( post-commit ) is not enabled..."
	fi
	if [[ $BRANCH_NAME == "master" ]]; then
	    echo "Cannot tag on branch master..."
	fi
fi

