#!/bin/bash
echo "Searching for $SEARCH_STRING in $SEARCH_FILE"
SEARCH_RESULT=$(awk -v SEARCH_STRING="$SEARCH_STRING" '$SEARCH_STRING \
    {
        p=index($1,"=");
        print substr($1,p+1) ;
    }' $SEARCH_FILE)
echo "Search result : $SEARCH_RESULT"