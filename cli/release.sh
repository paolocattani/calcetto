#!/bin/bash

SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )
cd "$SCRIPT_DIR" && cd ..

LOG_FILE="$SCRIPT_DIR/release.log"
source ./cli/redirect_output.sh

# TODO: See npm version --help
source ./cli/update_version.sh --patch

source ./cli/build.sh
