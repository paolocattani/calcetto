#!/bin/bash

# Redirect stdout and stderr to release.log
>release.log
exec &>release.log

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# TODO: See npm version --help
source $SCRIPT_DIR/update_version.sh --patch

source $SCRIPT_DIR/build.sh
