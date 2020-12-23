#!/bin/bash

if [ -z ${SEARCH_LENGTH+x} ]; then
    SEARCH_LENGTH=1;
fi
echo "Searching for $SEARCH_STRING in $SEARCH_FILE ($SEARCH_LENGTH)"
SEARCH_RESULT=$(python $( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/search_string.py $SEARCH_STRING $SEARCH_FILE $SEARCH_LENGTH 2>&1 >/dev/null)
echo "Search result : "$SEARCH_RESULT
