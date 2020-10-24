#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
cd $SCRIPT_DIR
cd ..

LOG_FILE="$SCRIPT_DIR/release.log"
source ./redirect_output.sh

# TODO: See npm version --help
source ./update_version.sh --patch

source ./build.sh
