#!/bin/bash

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
echo "On branch : "$BRANCH_NAME
echo "Enviroment : "$NODE_ENV

if [[ $NODE_ENV == "" ]] ||  [[ $NODE_ENV == "development" ]] && [[ $BRANCH_NAME == "develop" ]]; then
    echo "test"
fi
