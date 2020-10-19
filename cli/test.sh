#!/bin/bash

FILE_NAME='../hooks/.hooks'
SEARCH_STRING='PRE-COMMIT'
SEARCH_RESULT=$(awk "/$SEARCH_STRING=/ \
        {
            p=index($1,\"=\")
            print substr($1,p+1) ;
        }" $FILE_NAME)

