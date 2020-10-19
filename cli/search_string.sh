#!/bin/bash
SEARCH_RESULT=$(awk -v SEARCH_STRING="$SEARCH_STRING" '/$SEARCH_STRING=/ \
        {
            p=index($1,"=");
            print substr($1,p+1) ;
        }' $SEARCH_FILE)
