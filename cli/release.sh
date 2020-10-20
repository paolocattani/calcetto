#!/bin/bash

# Redirect stdout and stderr to release.log
>release.log
exec &>release.log

cd $( cd $( dirname "${BASH_SOURCE[0]}" ) >/dev/null 2>&1 && pwd )
cd ..

# TODO: See npm version --help
source ./update_version.sh --patch

source ./build.sh
