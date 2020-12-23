#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )

SEARCH_LENGTH='*'
SEARCH_STRING='TYPE'
SEARCH_FILE="$SCRIPT_DIR/.hooks"
source cli/search_string.sh
