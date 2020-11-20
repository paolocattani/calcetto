#!/bin/bash

echo "Searching for $SEARCH_STRING in $SEARCH_FILE"
SEARCH_RESULT=$(python $( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/search_string.py $SEARCH_STRING $SEARCH_FILE 2>&1 >/dev/null)
echo "Search result : "$SEARCH_RESULT
