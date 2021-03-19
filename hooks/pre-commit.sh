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
source cli/functions/search_string.sh

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

echo "On branch : $BRANCH_NAME"
echo "Enabled : $SEARCH_RESULT"

# Always exec lint
# See : https://gist.github.com/linhmtran168/2286aeafe747e78f53bf
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR)
PASS=1
if [[ "$STAGED_FILES" != "" ]]; then
    ESLINT="$(git rev-parse --show-toplevel)/node_modules/.bin/eslint"
    echo "\nValidating Files:\n"
    for FILE in $STAGED_FILES
    do
        "$ESLINT" "$FILE" --fix

        if [[ "$?" == 0 ]]; then
            echo "\t\033[32mESLint Passed: $FILE\033[0m"
        else
            echo "\t\033[41mESLint Failed: $FILE\033[0m"
            PASS=false
        fi
        echo "\nValidation completed!\n"
    done
    if ! $PASS; then
        echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass ESLint but do not. Please fix the ESLint errors and try again.\n"
        echo "./node_modules/.bin/eslint . "
        exit 1
    else
        echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
    fi
fi

# Only on dev environment, and branch develop , and if PRE-COMMIT flag is enabled
if [[ $BRANCH_NAME != "master" ]] && [[ $SEARCH_RESULT = 1 ]]; then

    echo "Start : $(date +'%Y.%m.%d - %H:%M:%S')"

    SEARCH_STRING='TYPE'
    SEARCH_FILE="$HOOKS_DIR/.hooks"
    SEARCH_LENGTH='*'
    source cli/functions/search_string.sh

    # Update version
    cli/cli.sh update "--$SEARCH_RESULT"

    cli/cli.sh add_to_commit

    # Disable this hook
	cli/cli.sh hook --disable --hook pre-commit

    echo "End : $(date +'%Y.%m.%d - %H:%M:%S')"
else
    echo "Skipping version update..."
fi

