#!/bin/bash

# Redirect stdout and stderr to release.log
>release.log
exec &>release.log

# TODO: See npm version --help
source ./update_version.sh --patch

source ./build.sh
